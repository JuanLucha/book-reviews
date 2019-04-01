import { BookReview } from './book-review.interface'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { httpOptions, baseUrl } from '../shared/http.constants'

@Injectable()
export class BookReviewService {
  constructor(private http: HttpClient) {

  }
  public addReview(review: BookReview) {
    return this.http.post(registerUserUrl, review, httpOptions)
  }
}

// Constants
const registerUserUrl: string = `${baseUrl}/book/review`
