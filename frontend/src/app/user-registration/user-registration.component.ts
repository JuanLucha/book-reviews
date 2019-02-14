import { UserRegistrationService } from './user-registration.service'
import { Component, OnInit } from '@angular/core'
import { UserCredentials } from './user-credentials.interface'

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  public credentials: UserCredentials = {
    userName: '',
    email: '',
    password: ''
  }

  constructor(private userRegistrationService: UserRegistrationService) { }

  public registerUser(): void {
    this.userRegistrationService.registerUser(this.credentials)
    .subscribe(() => {}, (error) => {console.log(error)})
  }
}
