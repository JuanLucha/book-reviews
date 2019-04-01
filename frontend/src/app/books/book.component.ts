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

  constructor(
    private userService: UserService,
    private bookSearchService: BookSearchService,
    private bookReviewService: BookReviewService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id')
    this.bookSearchService.getBook(id)
      .subscribe((result: { book: Book, reviews: BookReview[] }) => {
        this.book = result.book
        this.reviews = result.reviews
      })
  }

  public sendReview(): void {
    const review: BookReview = {
      bookId: this.book.id,
      rate: this.rate,
      review: this.reviewBody,
      userId: this.userService.getUserId()
    }

    this.bookReviewService.addReview(review)
      .subscribe((result) => console.log(result))
  }
}