import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SignupService } from '../service/signup/signup.service';
@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent {

    constructor(private service: SignupService, public snackBar: MatSnackBar) { }
    user: any = {};
    response: any;
    signup(userDetails: any) {
        console.log(userDetails);
        if (userDetails.password === userDetails.repassword) {
            this.service.signup(userDetails).subscribe((res: any) => {
                if (res.status == 201) {
                    this.response = JSON.parse(res._body);
                    console.log(this.response);
                    this.snackBar.open('Account created successfully !', '', { duration: 1000 });
                }
                else {
                    this.snackBar.open('Signup Failed!', '', { duration: 1000 });
                }
            })
        }
        else {
            this.snackBar.open('Passwords donot match', '', { duration: 1000 });
        }

    }


}
