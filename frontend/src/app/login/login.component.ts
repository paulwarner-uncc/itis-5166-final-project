import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { convertErrorCodes } from '../appsettings';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    password: new FormControl('', Validators.required)
  });
  newAccount = false;
  serverError: string|null = null;
  sessExpired: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if ((params as any).new === "true") {
        this.newAccount = true;
      } else {
        this.newAccount = false;
      }

      if ((params as any).expired === "true") {
        this.sessExpired = true;
      } else {
        this.sessExpired = false;
      }
    });
  }

  onSubmit(): void {
    let resp = this.authService.login(
      this.loginForm.value.username as string,
      this.loginForm.value.password as string
    );

    resp.subscribe(data => {
      if (data.success) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.serverError = convertErrorCodes(data.error as string);
      }
    });
  }
}
