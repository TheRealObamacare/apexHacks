import requests

GOOD_ON_YOU_URL = 'https://api.goodonyou.eco/brand/'
ESG_API_URL = 'https://site.financialmodelingprep.com/api/v3/esg/'

def fetch_goodonyou_rating(brand):
    resp = requests.get(f"{GOOD_ON_YOU_URL}{brand}")  # brand slug
    return resp.json().get('rating', 0)

def fetch_esg_score(ticker):
    resp = requests.get(f"{ESG_API_URL}{ticker}")  # company ticker
    return resp.json().get('esgScore', 0)

from models import ProductScore, db

WEIGHT_BRAND = 0.6
WEIGHT_ESG = 0.4

def compute_overall_score(brand, ticker):
    brand_score = fetch_goodonyou_rating(brand)
    esg_score = fetch_esg_score(ticker)
    return WEIGHT_BRAND * brand_score + WEIGHT_ESG * esg_score

def get_or_create_score(sku, brand, ticker):
    cached = ProductScore.query.filter_by(sku=sku).first()
    if cached:
        return cached.score
    score = compute_overall_score(brand, ticker)
    db.session.add(ProductScore(sku=sku, score=score))
    db.session.commit()
    return score

def find_alternatives(min_score=80):
    return ProductScore.query.filter(ProductScore.score >= min_score).all()