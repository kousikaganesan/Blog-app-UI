import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    isLoggedin = localStorage.getItem('isLoggedIn');

    canActivate() {
        if (this.isLoggedin) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}