import { User } from './user.model'
import { baseUrl, httpOptions } from './http.constants'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { Book } from './book.interface'

@Injectable()
export class BookSearchService {
  constructor(private http: HttpClient) {
  }

  public searchBook(searchTerm: string): Observable<Book[]> {
    return this.http.get(`${bookSearchUrl}${searchTerm}`, httpOptions) as Observable<Book[]>
  }
}

// Constants
const bookSearchUrl: string = `${baseUrl}/book/search?term=`
