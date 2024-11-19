import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BooksGalleryComponent} from '../app/components/books-gallery/books-gallery.component';
import { BooksServicesService } from './services/books-services.service';
import { Observable } from 'rxjs';
import { Books } from '../app/Models/Books';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BooksGalleryComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  books$: Observable<Books[]> = new Observable<Books[]>();
  private bookService = inject(BooksServicesService);

  title = 'app';

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.books$ = this.bookService.getBooks();
  }
}
