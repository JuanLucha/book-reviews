import { DashboardComponent } from './dashboard/dashboard.component'
import { UserLoginComponent } from './user-login/user-login.component'
import { UserRegistrationComponent } from './user-registration/user-registration.component'
import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  { path: 'signup', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: UserRegistrationComponent }
]
