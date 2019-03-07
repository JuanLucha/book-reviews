import { Book } from './../shared/book.interface'
import { BookSearchService } from './../shared/book-search.service'
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  public book: Book

  constructor(
    private bookSearchService: BookSearchService,
    private route: ActivatedRoute,) {
  }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id')
    this.bookSearchService.getBook(id)
    .subscribe((result: {book: Book}) => {
      this.book = result.book
    })
  }
}