import { Component, Input, inject, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Books, Subscribe, Subscription } from '../../models/Books';
import { CommonModule } from '@angular/common'; 
import { AuthServiceService } from '../../services/auth-service.service';
import { RouterOutlet, RouterModule, Router} from '@angular/router';
import {SubscriptionServiceService} from '../../services/subscription-service.service';

@Component({
  selector: 'app-books-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-gallery.component.html',
  styleUrl: './books-gallery.component.scss'
})
export class BooksGalleryComponent implements OnInit{
  @Input() books!: Observable<Books[]>; 
  private authServiceService = inject(AuthServiceService);
  private subscriptionService = inject(SubscriptionServiceService);
  isLoggedIn = false;
  private router = inject(Router);
  
  user: any;
  ngOnInit(): void {
    this.isAuthenticated();
    this.getUser();
  }

  onSubscribe(bookId: number) {
    if (this.isLoggedIn){

      console.log("user",this.user);
      //console.log("bookId",this.user);

      const subscribe: Subscribe = {
        userID: this.user.userID,  
        bookID: bookId
      };

      console.log("subscribe req",subscribe)
  
      this.subscriptionService.subscribe(subscribe).subscribe(
        response => {
          console.log('Successfully subscribed:', response);
          
        },
        error => {
          console.error('Subscription failed:', error);
  
        }
      );

    } else {
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
