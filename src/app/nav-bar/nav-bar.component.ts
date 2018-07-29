import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

import { BlogService } from '../service/blog/blog.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
    constructor(public dialog: MatDialog, private router: Router, private service: BlogService) { }
    isLoggedIn: any;

    ngOnInit() {
        // this.isLoggedIn = localStorage.getItem('isLoggedIn');
    }

    login() {
        let dialogRef = this.dialog.open(LoginComponent, {
            width: '250px',
            data: {}
        });
        this.isLoggedIn = false;
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.isLoggedIn = localStorage.getItem('isLoggedIn');
            console.log(result);
        });
    }

    signup() {
        let signupDialogRef = this.dialog.open(SignupComponent, {
            width: '250px',
            data: {}
        });

        signupDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
        });
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        this.router.navigate(['/']);

    }
}