import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
import pandas as pd
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from recommender import (
    parse_sku, parse_domain, normalize,
    compute_composite, retrieve_metrics,
    get_or_create_score, find_similar
)
from models import db, Product

@pytest.fixture
def app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SECRET_KEY'] = 'test'
    db.init_app(app)
    with app.app_context():
        db.create_all()
        yield app

def test_parse_functions():
    assert parse_sku("https://example.com/products/ABC123/") == "ABC123"
    assert parse_domain("https://sub.domain.NIKE.com/item/XYZ") == "nike"

def test_normalize_and_composite():
    series = pd.Series([0, 50, 100])
    norm = normalize(series)
    assert norm.iloc[0] == 0.0 and norm.iloc[-1] == 1.0
    metrics = {"energy": 50, "water": 100, "waste": 5, "yield": 80}
    comp = compute_composite(metrics)
    assert isinstance(comp, float) and 0 <= comp <= 1

def test_retrieve_metrics_proxy():
    raw, src = retrieve_metrics("SKU", "unknown", "nonexistent")
    assert src == "PROXY"
    assert set(raw.keys()) == {"energy", "water", "waste", "yield"}

def test_cache_and_similarity(app):
    # Seed database
    from recommender import get_or_create_score
    # retrieve_metrics with "tshirt" category uses PCR_PROXY_VALUES.
    # This results in an initial composite_score of approx 0.9 for these SKUs.
    score_a = get_or_create_score("A", "domain", "tshirt")
    score_b = get_or_create_score("B", "domain", "tshirt")
    score_c = get_or_create_score("C", "domain", "tshirt")
    assert score_a == pytest.approx(0.9)
    assert score_b == pytest.approx(0.9)
    assert score_c == pytest.approx(0.9)
    # Now manually update scores to differentiate
    with app.app_context():
        prod_a = Product.query.filter_by(sku="A").first()
        prod_b = Product.query.filter_by(sku="B").first()
        prod_c = Product.query.filter_by(sku="C").first()
        prod_a.composite_score = 0.9
        prod_b.composite_score = 0.7
        prod_c.composite_score = 0.5
        db.session.commit()
    similars = find_similar("A", k=2)
    assert [p.sku for p in similars] == ["B", "C"]
