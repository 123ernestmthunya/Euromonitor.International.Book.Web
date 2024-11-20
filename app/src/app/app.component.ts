import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet, RouterModule, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Books } from './models/Books';
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
  books$: Observable<Books[]> = new Observable<Books[]>();
  private bookService = inject(BooksServicesService);
  private authServiceService = inject(AuthServiceService);
  private router = inject(Router);
  isLoggedIn = false;

  title = 'app';

  ngOnInit(): void {

    this.router.events.subscribe(() => {
      const currentRoute = this.router.url; // Get current route URL
      // Show BooksGallery only on the home page
      this.showBooksGallery = currentRoute === '/';
    });

    this.loadBooks();
    this.isAuthenticated();
  }

  loadBooks(): void {
    this.books$ = this.bookService.getBooks();
  }

  isAuthenticated() {
    this.authServiceService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
}
