import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../../models/Books';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-books-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-gallery.component.html',
  styleUrl: './books-gallery.component.scss'
})
export class BooksGalleryComponent {
  @Input() books!: Observable<Books[]>; 
}  
