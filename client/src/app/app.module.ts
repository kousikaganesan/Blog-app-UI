import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TimeAgoPipe } from 'time-ago-pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatChipsModule,
  MatGridListModule,
  MatTooltipModule
} from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidenavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BlogComponent } from './blog/blog.component';
import { CreateBlogComponent } from './createBlog/createBlog.component';
import { EditBlogComponent } from './editBlog/editBlog.component';
import { UserComponent, ConfirmDialog } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { SearchListComponent } from './searchList/searchList.component';
import { AuthGuard } from './auth-guard/auth.guard';

import { OK, DOMAIN, ERROR, BLOG_CONFIG } from './interceptor/blog.constant'

import { BlogService } from './service/blog/blog.service';
import { LoginService } from './service/login/login.service';
import { SignupService } from './service/signup/signup.service';
import { UserService } from './service/user/user.service';
import { GenreService } from './service/genre/genre.service';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchListComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'create', component: CreateBlogComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditBlogComponent, canActivate: [AuthGuard] },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SidenavComponent,
    LoginComponent,
    ConfirmDialog,
    SignupComponent,
    UserComponent,
    BlogComponent,
    CreateBlogComponent,
    EditBlogComponent,
    SearchComponent,
    SearchListComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    ),
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatTooltipModule
  ],
  entryComponents: [
    SignupComponent,
    ConfirmDialog
  ],
  providers: [
    BlogService,
    LoginService,
    SignupService,
    UserService,
    GenreService,
    AuthGuard,
    {
      provide: OK,
      useValue: BLOG_CONFIG
    },
    {
      provide: DOMAIN,
      useValue: BLOG_CONFIG
    },
    {
      provide: ERROR,
      useValue: BLOG_CONFIG
    }
  ],
  bootstrap: [
    NavBarComponent
  ]
})
export class AppModule { }
