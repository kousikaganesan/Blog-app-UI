import { Component, ViewEncapsulation, OnInit } from '@angular/core';
@Component({
    selector: 'side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.css'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class SidenavComponent implements OnInit {

    constructor() { }
    // isLoggedIn: any;
    ngOnInit() {
        // this.isLoggedIn = localStorage.getItem('isLoggedIn');
    }

}
