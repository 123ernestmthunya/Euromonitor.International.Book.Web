import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Books, LoginRequest, User } from '../models/Books';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private regUrl: string = "http://localhost:5029/users/register";

  private loginUrl: string = "http://localhost:5029/login"

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private httpClient : HttpClient) { }

  login() {
    this.loggedIn.next(true); // Set user as logged in
  }
  registerUser(User: User): Observable<any> {
    return this.httpClient.post(this.regUrl, User);
  }

  loginUser(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post(this.loginUrl, loginRequest);
  }

  setUser(user: any){
    this.userSubject.next(user);
  }

  getUser() {
    // Optionally provide a method to get the user synchronously
    return this.userSubject.value;
  }
}
