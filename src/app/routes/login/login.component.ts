import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../security/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }
  /* variable declaration */
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  ngOnInit(): void {
    /* login verification */
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      this.authService.redirectionHome();
    }
  }

  /* submit login */
  onSubmit(): void {
    let user = this.loginForm.value;
    this.authService.login(user.email, user.password).subscribe({
      next: data => {
        this.authService.saveToken(data.token, user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
