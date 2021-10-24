import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  signIn(email: string, password: string): Observable<any> {
    return this.httpClient.post(
      `${environment.API_WIKIMOVIES}${environment.API_AUTH.PATH_AUTH}${environment.API_AUTH.ENDPOINT_LOGIN}`,
      {
        username: email,
        password,
      }
    );
  }

  signUp(userToRegister: User): Observable<any> {
    return this.httpClient.post(
      `${environment.API_WIKIMOVIES}${environment.API_AUTH.PATH_AUTH}${environment.API_AUTH.ENDPOINT_SIGNUP}`,
      userToRegister
    );
  }
}
