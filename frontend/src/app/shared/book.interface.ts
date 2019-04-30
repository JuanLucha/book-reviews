export interface Book {
  isbn: string
  title: string
  author: string
  year: number
  id?: number
  reviews: any[]
}

export interface BookResponse {
  books: Book[]
}