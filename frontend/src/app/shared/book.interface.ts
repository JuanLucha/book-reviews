export interface Book {
  isbn: string
  title: string
  author: string
  year: number
}

export interface BookResponse {
  books: Book[]
}