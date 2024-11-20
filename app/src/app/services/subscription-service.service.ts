import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subscribe, Subscription, SubscriptionResponse} from "../models/Books"
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SubscriptionServiceService {
  
  private subscribeUrl : string = "http://localhost:5029/susbribe";
  private subscriptionUrl: string = "http://localhost:5029/subscriptions/";
  private httpClient = inject(HttpClient);

  constructor() { }

  subscribe(request: Subscribe): Observable<any> {
    return this.httpClient.post(this.subscribeUrl, request);
  }

  getSubscriptions(userId: number): Observable<SubscriptionResponse> {
    return this.httpClient.get<SubscriptionResponse>(`${this.subscriptionUrl}${userId}`);
  }

}
