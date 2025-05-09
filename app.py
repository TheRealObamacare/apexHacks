from flask import Flask, render_template, request, session
from flask_sqlalchemy import SQLAlchemy
from turbo_flask import Turbo
import redis

app = Flask(__name__)
app.config['SECRET_KEY'] = 'REPLACE_WITH_SECURE_KEY'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///scores.db'
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.Redis(host='localhost', port=6379)

db = SQLAlchemy(app)  # simplified SQLAlchemy setup ([flask-sqlalchemy.readthedocs.io](https://flask-sqlalchemy.readthedocs.io/en/stable/quickstart/?utm_source=chatgpt.com))
turbo = Turbo(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/score', methods=['POST'])
def score():
    # placeholder; implement logic in Section 5
    url = request.form['url']
    return render_template('result.html', score=None, alternatives=[])