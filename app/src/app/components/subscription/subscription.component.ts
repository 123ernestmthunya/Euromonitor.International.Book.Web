import { Component, inject, OnInit} from '@angular/core';
import {SubscriptionServiceService} from '../../services/subscription-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import {Books, Subscription, SubscriptionResponse} from '../../models/Books'
import { CommonModule } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent implements OnInit {
  user: any;
  books!: Subscription[];; 
  private subscriptionService = inject(SubscriptionServiceService);
  private authServiceService = inject(AuthServiceService);
  private toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.getUser();
    this.getSubscriptions();
  }

  getSubscriptions(){
    this.subscriptionService.getSubscriptions(this.user.userID).subscribe(
      (response: SubscriptionResponse) => {
        this.books = response.subscriptions;
        this.toastrService.success('Successfully retrieved subscriptions','Success');
      },
      error => {
        console.error('Subscription failed:', error);
        this.toastrService.error('Error', 'Oops try again...');
      }
    );
  }
  
  getUser(){
    this.authServiceService.user$.subscribe((user) => {
      this.user = user;
    });
  }
  

  onUnsbscribe(data: any){

  }
}
