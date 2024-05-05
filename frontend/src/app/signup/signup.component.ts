import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { convertErrorCodes } from '../appsettings';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    password: new FormControl('', Validators.required),
    rptpassword: new FormControl('', Validators.required)
  }, { validators: this.validatePassword() });
  serverError: string|null = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  onSubmit(): void {
    let resp = this.authService.signup(
      this.signupForm.value.username as string,
      this.signupForm.value.password as string
    );

    resp.subscribe(data => {
      console.log(data);

      if (data.success) {
        this.router.navigate(["/login"], {
          queryParams: {
            "new": "true"
          }
        });
      } else {
        this.serverError = convertErrorCodes(data.error as string);
      }
    });
  }

  // Make sure both passwords match
  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Don't show an error until the user starts repeating the password
      if (control.value.rptpassword == "") {
        return null;
      }

      if (control.value.password != control.value.rptpassword) {
        return {
          noMatchPass: {
            value: control.value
          }
        }
      }

      return null;
    }
  }
}
