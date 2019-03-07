import { BookSearchService } from './../shared/book-search.service'
import { appRoutes } from './../app.routes'
import { Router } from '@angular/router'
import { UserLoginService } from './../shared/user-login.service'
import { Component } from '@angular/core'
import { Book, BookResponse } from '../shared/book.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public books: Book[] = []
  public noBooksMessage: boolean = false

  constructor(
    private bookSearchService: BookSearchService,
    private router: Router,
    private userLoginService: UserLoginService,
  ) { }

  public logout(): void {
    this.userLoginService.logOutUser()
      .subscribe(() => { this.router.navigate(['/signup']) })
  }

  public searchBooks(event): void {
    this.bookSearchService.searchBook(event.target.value)
    .subscribe((result: BookResponse) => {
      this.books = result.books
      if (this.books.length === 0) {
        this.noBooksMessage = true
      }
    })
  }
}
