import { BookReviewService } from './books/book-review.service'
import { DashboardComponent } from './dashboard/dashboard.component'
import { UserLoginService } from './shared/user-login.service'
import { UserLoginComponent } from './user-login/user-login.component'
import { appRoutes } from './app.routes'
import { UserRegistrationService } from './user-registration/user-registration.service'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UserRegistrationComponent } from './user-registration/user-registration.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { BookSearchService } from './shared/book-search.service'
import { BookComponent } from './books/book.component'
import { UserService } from './shared/user.service'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    BookComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    BookSearchService,
    UserRegistrationService,
    UserLoginService,
    BookReviewService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
