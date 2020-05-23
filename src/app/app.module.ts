import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { environment } from '../environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { ForumComponent } from './pages/forum/forum.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddBlogComponent } from './pages/add-blog/add-blog.component';
import { EventsComponent } from './pages/events/events.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UsersComponent } from './pages/users/users.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { ViewPostsComponent } from './pages/view-posts/view-posts.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { AccountComponent } from './pages/account/account.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AdminBlogPostComponent } from './pages/admin-blog-post/admin-blog-post.component';
import {MatDialogModule} from '@angular/material/dialog';
import {TextFieldModule} from '@angular/cdk/text-field';
import { AddEventComponent } from './pages/add-event/add-event.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { UpdateEventComponent } from './pages/update-event/update-event.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsfeedComponent,
    ForumComponent,
    NotFoundComponent,
    AdminComponent,
    AddBlogComponent,
    EventsComponent,
    LoginComponent,
    SignUpComponent,
    UsersComponent,
    DiscussionComponent,
    ViewPostsComponent,
    UserDetailComponent,
    PostDetailsComponent,
    EditPostComponent,
    AccountComponent,
    BlogDetailsComponent,
    AdminBlogPostComponent,
    AddEventComponent,
    UpdateEventComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatBadgeModule,
    MatDividerModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    TextFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [
    EditPostComponent,
    AddEventComponent,
    UpdateEventComponent
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
