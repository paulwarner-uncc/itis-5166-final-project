import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  newAccount = false;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if ((params as any).new === "true") {
        this.newAccount = true;
      } else {
        this.newAccount = false;
      }
    });
  }

  onSubmit(): void {
    let resp = this.authService.login(
      this.loginForm.value.username as string,
      this.loginForm.value.password as string
    );

    resp.subscribe(data => {
      console.log(data);
    });
  }
}
