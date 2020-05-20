import { Component, OnInit } from '@angular/core';
import { BlogService } from './service/blog/blog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: BlogService, private router: Router) { }
  blogs: any;
  popularBlog: any;
  response: any;
  blogResponse: any;

  ngOnInit() {
    this.getBlogDetails();
  }

  getBlogDetails() {
    this.popularBlog = [];
    this.service.getPopularBlog().subscribe((res: any) => {
      if (res.status == 200) {
        this.response = JSON.parse(res._body);
        this.blogs = this.response.response;
        this.blogs.map((blog) => {
          this.getBlogById(blog._id, blog.size);
        })
      }
    })
  }

  getBlogById(id, like) {
    this.service.getBlogDetails(id).subscribe((res: any) => {
      if (res.status == 200) {
        this.blogResponse = JSON.parse(res._body);
        this.blogResponse.response.likeCount = like; //modularize
        this.popularBlog.push(this.blogResponse.response);
      }
    })
  }

  showBlog(blog) {
    this.router.navigate(['/blog'], { queryParams: blog });
  }

}
