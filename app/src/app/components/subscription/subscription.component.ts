import { Component, inject, OnInit} from '@angular/core';
import {SubscriptionServiceService} from '../../services/subscription-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import {BookSubscription, BookSubscriptionResponse} from '../../models/Books'
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
  books: BookSubscription[] = [];
  private subscriptionService = inject(SubscriptionServiceService);
  private authServiceService = inject(AuthServiceService);
  private toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.getUser();
    this.getSubscriptions();
  }

  getSubscriptions(){
    this.subscriptionService.getSubscriptions(this.user.userID).subscribe(
      (response: BookSubscriptionResponse) => {
        this.books = response.data;
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
  

  onUnsubscribe(subscriptionId: number){
    this.subscriptionService.cancelSubscription(subscriptionId).subscribe(
      (response) => {
        if (response.success) {
          this.toastrService.success('Subscription canceled successfully');
          this.books = this.books.filter(book => book.subscriptionId !== subscriptionId);
        } else {
          this.toastrService.error('Failed to cancel subscription');
        }
      },
      (error) => {
        console.error('Error canceling subscription', error);
        this.toastrService.error('Error canceling subscription');
      }
    );
  }
}
