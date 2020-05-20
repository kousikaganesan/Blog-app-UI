import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
    selector: 'edit-blog',
    templateUrl: './editBlog.component.html',
    styleUrls: ['./editBlog.component.css']
})
export class EditBlogComponent implements OnInit {
    constructor(public dialog: MatDialog, private router: Router) { }
    isLoggedIn: any;
    ngOnInit() {
        // this.isLoggedIn = localStorage.getItem('isLoggedIn');
    }
   
}