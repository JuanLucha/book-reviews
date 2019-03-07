import { HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

const baseUrl: string = 'http://localhost:5000'

export {
  httpOptions,
  baseUrl
}
