import { User } from './user.model'
import { baseUrl } from './http.constants'
import { httpOptions } from './http.constants'
import { UserCredentials } from './user-credentials.interface'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'

@Injectable()
export class UserLoginService {
  constructor(private http: HttpClient) {
  }

  public loginUser(userCredentials: UserCredentials): Observable<User> {
    return this.http.post(registerUserUrl, userCredentials, httpOptions) as Observable<User>
  }

  public logOutUser(): Observable<boolean> {
    return this.http.post(logOutUserUrl, null, httpOptions) as Observable<boolean>
  }
}

// Constants
const registerUserUrl: string = `${baseUrl}/user/login`
const logOutUserUrl: string = `${baseUrl}/user/logout`
