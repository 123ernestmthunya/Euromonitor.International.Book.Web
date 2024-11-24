import { Injectable , inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subscribe, Subscription, BookSubscriptionResponse} from "../models/Books"
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SubscriptionServiceService {
  
  private subscribeUrl : string = "http://localhost:5029/susbribe";
  private subscriptionUrl: string = "http://localhost:5029/subscriptions/";
  private unsubscribeUrl: string = "http://localhost:5029/cancel-subscription"
  private httpClient = inject(HttpClient);

  constructor() { }

  subscribe(request: Subscribe): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(this.subscribeUrl, request, {headers});
  }

  getSubscriptions(userId: number): Observable<BookSubscriptionResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<BookSubscriptionResponse>(`${this.subscriptionUrl}${userId}`, {headers});
  }

  cancelSubscription(subscriptionId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete(`${this.unsubscribeUrl}/${subscriptionId}`, {headers});
  }

}
