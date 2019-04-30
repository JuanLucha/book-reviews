import { BookReview } from './book-review.interface'
import { Book } from './../shared/book.interface'
import { BookSearchService } from './../shared/book-search.service'
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { BookReviewService } from './book-review.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  public book: Book
  public rate: number
  public reviewBody: string
  public reviews: BookReview[] = []

  private bookId: number

  constructor(
    private userService: UserService,
    private bookSearchService: BookSearchService,
    private bookReviewService: BookReviewService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.bookId = +this.route.snapshot.paramMap.get('id')
    this.getBook(this.bookId)
  }

  public sendReview(): void {
    const review: BookReview = {
      bookId: this.book.id,
      rate: this.rate,
      review: this.reviewBody,
      userId: this.userService.getUserId()
    }

    this.bookReviewService.addReview(review)
      .subscribe((result: {success: boolean}) => {
        if (result.success) {
          this.getBook(this.bookId)
        }
      })
  }

  private getBook(id: number) {
    this.book = null

    this.bookSearchService.getBook(id)
      .subscribe((result: Book) => {
        this.book = result
        this.reviews = result.reviews
      })
  }
}