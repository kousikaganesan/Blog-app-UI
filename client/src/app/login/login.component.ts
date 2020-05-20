import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, } from '@angular/material';
import { Router } from '@angular/router';

import { LoginService } from '../service/login/login.service';
import { OK } from '../interceptor/blog.constant';
import { BlogInterface } from '../interceptor/blog.interface';

@Component({
  selector: 'blog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  constructor(
    private service: LoginService,
    public snackBar: MatSnackBar,
    private router: Router,
    @Inject(OK) private RESPONSE: BlogInterface) { }

  user: any = {};
  reset: any = {};
  response: any;
  show: any = true;
  resetForm: any = true;

  ngOnInit() {
    // localStorage.setItem('isLoggedIn', 'false');
  }

  login(loginDetails: any) {
    console.log(loginDetails);
    this.service.login(loginDetails).subscribe((res: any) => {
      console.log(res);
      if (res.status == this.RESPONSE.OK) {
        this.response = JSON.parse(res._body);
        console.log(this.response);
        this.snackBar.open('Logined successfully !', '', { duration: 1000 });
        localStorage.setItem('userId', this.response.Success._id);
        localStorage.setItem('token', this.response.token);
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/profile']);
      }
      else {
        this.snackBar.open('Login Failed!', '', { duration: 1000 });
      }
    })
  }

  forgotPassword() {
    this.show = false;


  }

  backToLogin() {
    this.show = true;
    this.resetForm = true;
  }

  sendOtp(email) {
    this.resetForm = false;
    this.service.forgotPassword(email).subscribe((res: any) => {
      console.log(res);
      if (res.status == this.RESPONSE.OK) {
        this.response = JSON.parse(res._body);
        console.log(this.response);
        this.snackBar.open('An OTP has sent to your mail. Please use that to reset your password !', '', { duration: 2000 });
      }
      else {
        this.snackBar.open('Something bad happnened', '', { duration: 1000 });
      }
    })
  }

  resendOTP() {
    this.show = false;
    this.resetForm = true;
  }

  resetPassword(reset) {
    console.log('reset password', reset);
  }

}
