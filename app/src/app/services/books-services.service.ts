import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Books } from '../models/Books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksServicesService {

  url : string = "http://localhost:5029/books";

  constructor(private httpClient : HttpClient) { 

  }

  getBooks(): Observable<Books[]> {
    return this.httpClient.get<Books[]>(this.url);
  }
}
