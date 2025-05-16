from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from turbo_flask import Turbo
import secrets
from models import db

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(32) # Generate a random secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///scores.db'

db.init_app(app)
turbo = Turbo(app)

from recommender import parse_sku, get_or_create_score, find_alternatives

@app.route('/')
def index():
    return render_template('index.html')

from recommender import parse_sku, parse_domain, get_or_create_score, find_similar

@app.route('/score', methods=['POST'])
def score():
    url      = request.form['url']
    sku      = parse_sku(url)
    domain   = parse_domain(url)
    category = determine_category(url)
    score    = get_or_create_score(sku, domain, category)
    similars = find_similar(sku)
    fragment = render_template('result.html', score=score, similars=similars)
    if turbo.can_stream():
        return turbo.stream(turbo.replace(fragment, target='content'))
    return fragment

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
