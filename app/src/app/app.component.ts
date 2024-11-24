import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd} from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from './models/Books';
import { CommonModule } from '@angular/common';
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
  books$: Observable<Book[]> = new Observable<Book[]>();
  private bookService = inject(BooksServicesService);
  private authServiceService = inject(AuthServiceService);
  private router = inject(Router);
  isLoggedIn = false;
  user:any;

  title = 'Books';

  ngOnInit(): void {
    this.loadBooks();
    this.showBooks();
    this.isAuthenticated();
    this.getUser();
    
    this.books$.subscribe({
      next: (books) => console.log('Books:', books),
      error: (err) => console.error('Error loading books:', err),
      complete: () => console.log('Books loading complete'),
    });
  }

  showBooks(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const systemRoutes = ['/login', '/register', '/subscription', "/password-reset"];
        let unkownRoutes = systemRoutes.includes(event.url);
        this.showBooksGallery = !systemRoutes.includes(event.url) && unkownRoutes;
      
        if(event.url === '/'){
           this.showBooksGallery = true;
        }
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
    });
  }

  onlogout(){
    this.authServiceService.logout();
    this.router.navigate(['']);
  }
}
