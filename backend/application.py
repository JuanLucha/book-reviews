import os

from flask import Flask, session, request
from flask_session import Session
from flask_cors import CORS
from flask import jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import logging
import requests

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuring CORS
app.config['CORS_HEADERS'] = 'Content-Type'
# CORS(app)
CORS(app)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Connect to database
conn_string = os.getenv("DATABASE_URL")
conn = create_engine(conn_string)

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

# Key for Good Reads Api
good_reads_api_key = os.getenv("GOODREADS_KEY")


@app.route("/user/register", methods=['POST'])
def register():
    values = request.get_json()
    username = values['userName']
    email = values['email']
    password = values['password']
    register_query = "INSERT INTO users(username, password, email) VALUES('{0}', '{1}', '{2}')".format(
        username, password, email)
    conn.execute(register_query)
    return jsonify({"success": True})


@app.route("/user/login", methods=['POST'])
def login():
    values = request.get_json()
    email = values['email']
    password = values['password']
    register_query = "SELECT * FROM users WHERE email = '{0}' AND password = '{1}'".format(
        email, password)
    result = conn.execute(register_query).fetchone()
    if result:
        session['logged'] = True
        return jsonify(dict(result))
    else:
        return jsonify({"error": "No user with that credentials was found"})


@app.route("/user/logout", methods=['POST'])
def logout():
    session['logged'] = False
    return jsonify({"logout": True})


@app.route("/book/search", methods=['GET'])
def search():
    search_term = request.args.get('term', '')
    search_query = "SELECT * FROM books WHERE isbn LIKE '%%{}%%' OR title LIKE '%%{}%%' OR author LIKE '%%{}%%'".format(
        search_term, search_term, search_term)
    result = conn.execute(search_query).fetchall()
    return jsonify({'books': [dict(book) for book in result]})


@app.route("/book/<id>", methods=['GET'])
def get_book_by_id(id):
    search_query = "id = {}".format(id)
    book = get_book(search_query)
    review_info = get_review_info(book['isbn'])
    book = dict(book, **review_info)
    return jsonify(book)


@app.route("/book/review", methods=['POST'])
def add_review():
    values = request.get_json()
    rate = values['rate']
    review = values['review']
    book_id = values['bookId']
    user_id = values['userId']
    add_review_query = "INSERT INTO reviews(book_id, rate, review, user_id) VALUES ({}, {}, '{}', {})".format(
        book_id, rate, review, user_id)
    conn.execute(add_review_query)
    return jsonify({'success': True})


@app.route("/api/<isbn>", methods=['GET'])
def get_book_by_isbn(isbn):
    search_query = "isbn = '{}'".format(isbn)
    book = get_book(search_query)
    review_info = get_review_info(isbn)
    book = dict(book, **review_info)
    return jsonify(book)


# Helpers

def get_book(condition):
    search_query = "SELECT * FROM books WHERE {}".format(condition)
    book = conn.execute(search_query).fetchone()
    book = dict(book)
    search_reviews = "SELECT * FROM reviews, users WHERE reviews.book_id = {} AND reviews.user_id = users.id".format(
        book['id'])
    reviews = conn.execute(search_reviews).fetchall()
    book['reviews'] = []
    for review in reviews:
        book['reviews'].append(dict(review))
    return book

def get_review_info(isbn):
    api_url = "https://www.goodreads.com/book/review_counts.json?key={}&isbns[]={}".format(
        good_reads_api_key, isbn)
    print(api_url)
    result = requests.get(api_url)
    review_info = {}
    print(result)
    if result.status_code == 200:
        result_body = result.json()
        print("rr == ")
        print(result_body)
        review_info['average_score'] = float(result_body['books'][0]['average_rating'])
        review_info['review_count'] = result_body['books'][0]['reviews_count']
    return review_info