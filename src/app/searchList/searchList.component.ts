import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SearchComponent } from '../search/search.component';
@Component({
    selector: 'search-list',
    templateUrl: './searchList.component.html',
    styleUrls: ['./searchList.component.css']
})
export class SearchListComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute) { }
    searchedBlog: any;
    searchValue: string;
    ngOnInit() {
        this.searchedBlog = JSON.parse(this.route.snapshot.params.data);
        console.log(JSON.parse(this.route.snapshot.params.data));
    }
    showBlog(blog) {
        this.router.navigate(['/blog'], { queryParams: blog });
    }
    search() {

    }
}