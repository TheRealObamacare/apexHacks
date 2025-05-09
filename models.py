from app import db

class ProductScore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String, unique=True, nullable=False)
    score = db.Column(db.Float, nullable=False)