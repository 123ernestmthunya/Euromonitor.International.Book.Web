import { Component, Input, inject, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Book, Subscribe, Subscription, LoginReponseUser} from '../../models/Books';
import { CommonModule } from '@angular/common'; 
import { AuthServiceService } from '../../services/auth-service.service';
import { RouterOutlet, RouterModule, Router} from '@angular/router';
import {SubscriptionServiceService} from '../../services/subscription-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-gallery.component.html',
  styleUrl: './books-gallery.component.scss'
})
export class BooksGalleryComponent implements OnInit{
  @Input() books!: Observable<Book[]>; 
  private authServiceService = inject(AuthServiceService);
  private subscriptionService = inject(SubscriptionServiceService);
  private toastrService = inject(ToastrService);
  isLoggedIn = false;
  private router = inject(Router);
  user: LoginReponseUser| null = null;

  ngOnInit(): void {
    this.isAuthenticated();
    this.getUser();
  }

  onSubscribe(bookId: number) {
    
    if (this.isLoggedIn)
    {
      if (!this.user?.userId) {
        this.toastrService.error('Unable to subscribe. Please try again.', 'Error');
        return;
      }

      const subscribe: Subscribe = { bookID: bookId, userID: this.user?.userId };
      this.subscriptionService.subscribe(subscribe!).subscribe(
        response => {
          console.log('Successfully subscribed:', response);
          this.toastrService.success('Subscribed successfully','Success');
          
        },
        error => {
          console.error('Subscription failed:', error);
          this.toastrService.error('Error', 'Oops try again...');
  
        }
      );

    } 
    else 
    {
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated() {
    this.authServiceService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  getUser(){
    this.authServiceService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}  
