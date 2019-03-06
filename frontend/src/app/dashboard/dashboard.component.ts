import { appRoutes } from './../app.routes'
import { Router } from '@angular/router'
import { UserLoginService } from './../shared/user-login.service'
import { Component } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private userLoginService: UserLoginService,
    private router: Router
  ) { }

  public logout(): void {
    this.userLoginService.logOutUser()
      .subscribe(() => { this.router.navigate(['/signup']) })
  }
}
