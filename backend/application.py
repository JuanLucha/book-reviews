import os

from flask import Flask, session, request
from flask_session import Session
from flask_cors import CORS
from flask import jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import logging
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
    email = request.form['email']
    password = request.form['password']
    register_query = "SELECT username FROM users WHERE email = '{0}' AND password = '{1}'".format(
        email, password)
    result = conn.execute(register_query)
    if result.rowcount > 0:
        session['logged_in'] = True
    else:
        return jsonify({})
