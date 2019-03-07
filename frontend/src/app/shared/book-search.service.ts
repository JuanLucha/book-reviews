import { baseUrl } from './http.constants'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { BookResponse, Book } from './book.interface'

@Injectable()
export class BookSearchService {
  constructor(private http: HttpClient) {
  }

  public getBook(id: number): Observable<{book: Book}> {
    return this.http.get<{book: Book}>(`${bookUrl}/${id}`)
  }

  public searchBook(searchTerm: string): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${bookSearchUrl}${searchTerm}`)
  }
}

// Constants
const bookUrl: string = `${baseUrl}/book`
const bookSearchUrl: string = `${bookUrl}/search?term=`
