import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd} from '@angular/router';
import { Observable } from 'rxjs';
import { Books } from './models/Books';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {BooksGalleryComponent} from '../app/components/books-gallery/books-gallery.component';
import { BooksServicesService } from './services/books-services.service';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { AuthServiceService } from './services/auth-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BooksGalleryComponent, CommonModule, RouterModule, SubscriptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  showBooksGallery: boolean = true;
  books$: Observable<Books[]> = new Observable<Books[]>();
  private bookService = inject(BooksServicesService);
  private authServiceService = inject(AuthServiceService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);
  isLoggedIn = false;
  user:any;

  title = 'Books';

  ngOnInit(): void {
    this.canShowBooksGallery();
    this.loadBooks();
    this.isAuthenticated();
    this.getUser();
  }

  canShowBooksGallery(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showBooksGallery = 
        event.url !== '/login' && 
        event.url !== '/register' && 
        event.url !== '/subscription';
      }
    });
  }

  loadBooks(): void {
    this.books$ = this.bookService.getBooks();
  }

  isAuthenticated() {
    this.authServiceService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  getUser(){
    this.authServiceService.user$.subscribe((user) => {
      this.user = user;
      console.log("login user", this.user)
    });
  }
}
