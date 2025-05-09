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

@app.route('/score', methods=['POST'])
def score():
    url = request.form['url']
    sku = parse_sku(url)
    score_value = get_or_create_score(sku, brand=sku, ticker=sku)
    alternatives = find_alternatives(min_score=80)

    # Build the single “replace” operation
    update = turbo.replace(
        render_template('result.html', score=score_value, alternatives=alternatives),
        target='content'
    )

    # If the client supports Turbo Streams, return a stream response…
    if turbo.can_stream():
        return turbo.stream(update)
    # …otherwise fall back to a normal full‑page render
    return render_template('result.html', score=score_value, alternatives=alternatives)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
