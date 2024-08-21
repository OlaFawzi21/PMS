import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  getEmailErrorMessage() {
    const emailControl: any = this.loginForm.get('email');

    if (emailControl.hasError('required')) {
      return 'You must enter a value';
    }
    return emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    const passwordControl: any = this.loginForm.get('password');
    return passwordControl.hasError('required') ? 'You must enter a value' : '';

  }

  onLogin(data: FormGroup) {
    this._AuthService.login(data.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.clear;
        localStorage.setItem('userToken', res.token);
        this._AuthService.getProfile();
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, 'Error!');
      },
      complete: () => {
        console.log('Completed Login');
        this._ToastrService.success(" You're now logged in. Let’s get started.", 'Success!');
        this._Router.navigate(['/dashboard']);
      }
    })
  }

  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router) { }

}
