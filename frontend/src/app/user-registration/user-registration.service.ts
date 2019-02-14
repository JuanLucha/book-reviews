import { User } from './../shared/user.model'
import { baseUrl } from './../shared/http.constants'
import { httpOptions } from '../shared/http.constants'
import { UserCredentials } from './user-credentials.interface'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'

@Injectable()
export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }

  public registerUser(userCredentials: UserCredentials): Observable<User> {
    return this.http.post(registerUserUrl, userCredentials, httpOptions) as Observable<User>
  }
}

// Constants
const registerUserUrl: string = `${baseUrl}/user/register`
