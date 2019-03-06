import { Router } from '@angular/router'
import { UserLoginService } from '../shared/user-login.service'
import { Component } from '@angular/core'
import { UserCredentials } from '../shared/user-credentials.interface'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  public credentials: UserCredentials = {
    userName: '',
    email: '',
    password: ''
  }

  constructor(
    private userLoginService: UserLoginService,
    private router: Router
    ) { }

  public loginUser(): void {
    this.userLoginService.loginUser(this.credentials)
      .subscribe(() => { this.router.navigate(['/dashboard']) }, (error) => { console.log(error) })
  }
}
