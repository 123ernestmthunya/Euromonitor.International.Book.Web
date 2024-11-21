import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/Books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksServicesService {

  url : string = "http://localhost:5029/books";

  constructor(private httpClient : HttpClient) { 

  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.url);
  }
}
