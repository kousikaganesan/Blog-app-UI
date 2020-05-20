import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { BlogService } from '../service/blog/blog.service';
import { LoginService } from '../service/login/login.service';
import { OK } from '../interceptor/blog.constant';
import { BlogInterface } from '../interceptor/blog.interface';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private blogService: BlogService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(OK) private RESPONSE: BlogInterface) { }

  userId: any;
  response: any;
  myBlogs: any;

  ngOnInit() {
    this.getMyBlogs();
  }

  getMyBlogs() {
    this.myBlogs = [];
    this.userId = localStorage.getItem('userId');
    this.response = this.blogService.getBlogList();
    console.log('this.response', this.response);
    this.blogService.getBlogList().subscribe((res: any) => {
      if (res.status == this.RESPONSE.OK) {
        this.response = JSON.parse(res._body);
        this.response.map((blog) => {
          if (blog.creator == this.userId) {
            this.myBlogs.push(blog);

          }
        })
      }
    })
  }

  createBlog() {
    this.router.navigate(['/create']);
  }

  showBlog(blog) {
    this.router.navigate(['/blog'], { queryParams: blog });
  }

  editBlog(blog) {
    this.router.navigate(['/edit']);
  }
  deleteBlog(blog) {
    console.log('inside delete blog', blog);
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { 'blog': blog }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    private blogService: BlogService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cancel() {
    this.dialogRef.close();
  }
  ok(id) {
    console.log('ok delete it', id);
    this.blogService.deleteBlog(id);
    this.dialogRef.close();
  }

}