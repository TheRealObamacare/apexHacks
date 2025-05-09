import requests
from models import ProductScore, db

def parse_sku(url: str) -> str:
    parts = url.rstrip("/").split("/")
    return parts[-1] if parts[-1] else parts[-2]

def get_or_create_score(sku: str, brand: str, ticker: str) -> float:
    # 1. Check the database for an existing score
    record = ProductScore.query.filter_by(sku=sku).first()
    if record:
        return record.score

    # 2. Get data from external APIs to score the product
    goodonyou = requests.get(f"https://api.goodonyou.eco/{brand}").json()["rating"]
    esg = requests.get(f"https://financialmodelingprep.com/api/v3/esg/{ticker}").json()["esgScore"]

    overall = 0.6 * goodonyou + 0.4 * esg

    # 3. Caching the result allows for faster lookups for previous search queries
    new = ProductScore(sku=sku, score=overall)
    db.session.add(new)
    db.session.commit()
    return overall

def find_alternatives(min_score: float=80) -> list[ProductScore]:
    return ProductScore.query.filter(ProductScore.score >= min_score).all()
