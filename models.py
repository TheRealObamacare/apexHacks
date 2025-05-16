from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# Important things to keep track of: 
class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String, unique=True, nullable=False)
    category = db.Column(db.String, nullable=False)            # e.g. "tshirt", "sneakers"
    # manufacturing metrics (raw)
    energy_usage = db.Column(db.Float, nullable=False)            # kWh per unit :contentReference[oaicite:1]{index=1}
    water_usage = db.Column(db.Float, nullable=False)            # liters per unit
    waste_generated = db.Column(db.Float, nullable=False)            # kg per unit
    material_yield = db.Column(db.Float, nullable=False)            # % of input in final
    # composite sustainability score (0–1)
    composite_score = db.Column(db.Float, nullable=False)
    data_source = db.Column(db.String, nullable=False)
