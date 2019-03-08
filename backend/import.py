from sqlalchemy import create_engine
import csv

def escape(value):
    return value.replace("'", "''")

conn_string = 'postgres://opplqhbestjfch:fb76f1edbbc26da3fb7f31adbc752f3354d7b4726b91452eba17c20a5ace5d72@ec2-50-17-250-38.compute-1.amazonaws.com:5432/dea1fj8vq9cn8j'

conn = create_engine(conn_string)

# User table creation
conn.execute('CREATE TABLE IF NOT EXISTS users (username VARCHAR(50), password VARCHAR(300), email VARCHAR(200), id SERIAL PRIMARY KEY)')

# Reviews table creation
conn.execute('CREATE TABLE IF NOT EXISTS reviews (book_id INTEGER, review VARCHAR(500), rate SMALLINT, id SERIAL PRIMARY KEY)')

# Books table creation and population
conn.execute('CREATE TABLE IF NOT EXISTS books (isbn VARCHAR(15), title VARCHAR(50), author VARCHAR(50), year INTEGER, id SERIAL PRIMARY KEY)')
conn.execute('DELETE FROM books')

with open('books.csv') as books_file:
    books = csv.reader(books_file, delimiter=',')
    book_counter = 0
    book_query = 'INSERT INTO books (isbn, title, author, year) VALUES'
    first_book = True
    for book in books:
        if first_book == True:
            first_book = False
        else:
            if book_counter == 1000:
                book_counter = 0
                book_query = book_query[:-1]
                conn.execute(book_query)
                book_query = 'INSERT INTO books (isbn, title, author, year) VALUES'
            else:
                book_counter += 1
                book_query += "('{}', '{}', '{}', '{}'),".format(escape(book[0]), escape(book[1]), escape(book[2]), escape(book[3]))
                print(book)
    book_query = book_query[:-1]
    conn.execute(book_query)
