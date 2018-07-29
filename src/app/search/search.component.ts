import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { BlogService } from '../service/blog/blog.service';
@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    constructor(private router: Router, private service: BlogService) { }
    searchData: string;
    searchedBlog: any;
    response: any;
    result: String;

    ngOnInit() {
        this.result = '';
    }

    search() {
        console.log(this.searchData);
        if (this.searchData.length > 3) {
            this.service.searchBlog(this.searchData).subscribe((res: any) => {
                if (res.status === 200) {
                    this.response = JSON.parse(res._body);
                    this.searchedBlog.splice(0, this.searchedBlog.length);
                    this.response.response.map((data) => {
                        this.searchedBlog.push(data);
                    })

                    console.log(this.searchedBlog);

                    this.router.navigate(['/search', { data: JSON.stringify(this.searchedBlog) }]);
                }
                else {
                }
            })

        }
        else if (this.searchData.length <= 3) {

            this.router.navigate(['/']);
            this.searchedBlog = [];

        }


    }

}