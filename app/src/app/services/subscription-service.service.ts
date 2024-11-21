import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.post(this.subscribeUrl, request);
  }

  getSubscriptions(userId: number): Observable<BookSubscriptionResponse> {
    return this.httpClient.get<BookSubscriptionResponse>(`${this.subscriptionUrl}${userId}`);
  }

  cancelSubscription(subscriptionId: number): Observable<any> {
    return this.httpClient.delete(`${this.unsubscribeUrl}/${subscriptionId}`);
  }

}
