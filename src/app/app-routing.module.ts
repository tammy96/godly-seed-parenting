import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { ForumComponent } from './pages/forum/forum.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EventsComponent } from './pages/events/events.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddBlogComponent } from './pages/add-blog/add-blog.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UsersComponent } from './pages/users/users.component';
import { ViewPostsComponent } from './pages/view-posts/view-posts.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'newsfeed', component: NewsfeedComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'events', component: EventsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignUpComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: '', redirectTo: 'upload', pathMatch: 'full'},
    {path: 'upload', component: AddBlogComponent},
    {path: 'posts', component: ViewPostsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'discussions', component: DiscussionComponent}
  ]},
  {path: '**', redirectTo: '404', pathMatch: 'full'},
  {path: '404', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
