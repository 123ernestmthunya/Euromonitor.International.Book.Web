import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Books, LoginRequest, User } from '../models/Books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private regUrl: string = "http://localhost:5029/users/register";

  private loginUrl: string = "http://localhost:5029/login"

  constructor(private httpClient : HttpClient) { }

  registerUser(User: User): Observable<any> {
    return this.httpClient.post(this.regUrl, User);
  }

  loginUser(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post(this.loginUrl, loginRequest);
  }
}
