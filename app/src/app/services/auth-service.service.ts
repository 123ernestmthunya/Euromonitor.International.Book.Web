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

  private loggedIn = new BehaviorSubject<boolean>(this.getInitialAuthState());
  isLoggedIn$ = this.loggedIn.asObservable();

  private user = new BehaviorSubject<any>(this.getInitialUser());
  user$ = this.user.asObservable();

  constructor(private httpClient : HttpClient) { }

  registerUser(User: User): Observable<RegisterReponse> {
    return this.httpClient.post<RegisterReponse>(this.regUrl, User);
  }

  loginUser(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.loginUrl, loginRequest);
  }


  passwordReset(loginRequest: PasswordReset): Observable<PasswordResetResponse> {
    return this.httpClient.post<PasswordResetResponse>(this.passwordResetUrl, loginRequest);
  }

  private getInitialAuthState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private getInitialUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  getUser() {
    return this.user.value;
  }


  login() {
    this.loggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    this.loggedIn.next(false);
    this.user.next(null);
    localStorage.clear();
    console.log("local storage clear")
    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');

  }
}
