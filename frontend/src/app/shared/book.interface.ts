export interface Book {
  isbn: string
  title: string
  author: string
  year: number
  id?: number
}

export interface BookResponse {
  books: Book[]
}