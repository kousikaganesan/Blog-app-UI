import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { GenreService } from '../service/genre/genre.service';
import { Router, ActivatedRoute } from '@angular/router';

import { OK } from '../interceptor/blog.constant';
import { BlogInterface } from '../interceptor/blog.interface';

@Component({
    selector: 'blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    constructor(
        private userService: UserService,
        private genreService: GenreService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(OK) private RESPONSE: BlogInterface
    ) { }
    sub: any;
    blog: any;
    response: any;
    creator: any = "";
    genre: any = '';
    ngOnInit() {
        this.getBlogDetails();
        this.getCreatorDetails();
        this.getGenreDetails()
    }
    getBlogDetails() {
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.blog = params
            });
    }

    getCreatorDetails() {
        console.log('inside get creator details');
        this.userService.getAllUser().subscribe((res: any) => {
            console.log(res);
            if (res.status == this.RESPONSE.OK) {
                this.response = JSON.parse(res._body);
                console.log(this.response);
                this.response.response.map((user) => {
                    if (this.blog.creator == user._id) {
                        this.creator = user.name;
                    }
                })
            }
            else {
                console.error(res);
            }

        })
    }

    getGenreDetails() {
        console.log('inside get creator details');
        this.genreService.getGenre().subscribe((res: any) => {
            console.log(res);
            if (res.status == this.RESPONSE.OK) {
                this.response = JSON.parse(res._body);
                console.log(this.response);
                this.response.response.map((genre) => {
                    if (this.blog.genre == genre._id) {
                        this.genre = genre.title;
                    }
                })
            }
            else {
                console.error(res);
            }

        })
    }
}
