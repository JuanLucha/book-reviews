import { baseUrl } from './http.constants'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { BookResponse } from './book.interface'

@Injectable()
export class BookSearchService {
  constructor(private http: HttpClient) {
  }

  public searchBook(searchTerm: string): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${bookSearchUrl}${searchTerm}`)
  }
}

// Constants
const bookSearchUrl: string = `${baseUrl}/book/search?term=`
