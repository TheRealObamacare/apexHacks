from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ProductScore(db.Model):
    __tablename__ = "product_scores"
    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String, unique=True, nullable=False)
    score = db.Column(db.Float, nullable=False)