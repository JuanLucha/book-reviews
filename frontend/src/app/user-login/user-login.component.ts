import { Router } from '@angular/router'
import { UserLoginService } from '../shared/user-login.service'
import { Component } from '@angular/core'
import { UserCredentials } from '../shared/user-credentials.interface'
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

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
    private router: Router,
    private userService: UserService,
  ) { }

  public loginUser(): void {
    this.userLoginService.loginUser(this.credentials)
      .subscribe((user: User) => {
        this.userService.setUser(user)
        this.router.navigate(['/dashboard'])
      }, (error) => { console.log(error) })
  }
}
