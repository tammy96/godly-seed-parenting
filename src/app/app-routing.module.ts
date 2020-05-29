import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { canActivate, hasCustomClaim } from '@angular/fire/auth-guard';

import { HomeComponent } from './pages/home/home.component';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { ForumComponent } from './pages/forum/forum.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EventsComponent } from './pages/events/events.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { EmailVerifyComponent } from './pages/email-verify/email-verify.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ProfileComponent } from './pages/profile/profile.component';

const adminOnly = () => hasCustomClaim('admin');


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'newsfeed', component: NewsfeedComponent},
  {path: 'newsfeed/:id', component: BlogDetailsComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'events', component: EventsComponent},
  {path: 'register', component: SignUpComponent},
  {path: 'admin', component: AdminComponent, ...canActivate(adminOnly)},
  {path: 'login', component: LoginComponent},
  {path: 'verify', component: EmailVerifyComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'},
  {path: '404', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
