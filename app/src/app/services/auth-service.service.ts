import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasswordReset, PasswordResetResponse, LoginRequest, User, RegisterReponse, LoginResponse} from '../models/Books';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private regUrl: string = "http://localhost:5029/users/register";
  private passwordResetUrl: string = "http://localhost:5029/password-reset";
  private loginUrl: string = "http://localhost:5029/login"

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private httpClient : HttpClient) { }

  login() {
    this.loggedIn.next(true);
  }
  registerUser(User: User): Observable<RegisterReponse> {
    return this.httpClient.post<RegisterReponse>(this.regUrl, User);
  }

  loginUser(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.loginUrl, loginRequest);
  }


  passwordReset(loginRequest: PasswordReset): Observable<PasswordResetResponse> {
    return this.httpClient.post<PasswordResetResponse>(this.loginUrl, loginRequest);
  }

  setUser(user: any){
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }
}
