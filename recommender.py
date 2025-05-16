import requests
import tldextract
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from tabula import read_pdf
from models import Product, db

# Tier‑3 proxy defaults per PCR
PCR_PROXY_VALUES = {
    "tshirt": {"energy": 40, "water": 150, "waste": 4, "yield": 80}
}

def parse_sku(url: str) -> str:
    parts = url.rstrip("/").split("/")
    return parts[-1] or parts[-2]

def parse_domain(url: str) -> str:
    return tldextract.extract(url).domain.lower()

def retrieve_metrics(sku: str, domain: str, category: str):
    # Tier 1: Simulated LCA DB call (stub)
    metrics = None
    if metrics:
        return metrics, "LCA_DB"

    # Tier 2: Try to scrape EPD PDF
    try:
        dfs = read_pdf(f"https://{domain}.com/epd/{sku}.pdf", pages="all", stream=True)
        if dfs:
            row = dfs[0].iloc[0]
            return {
                "energy": float(row["Energy_kWh"]),
                "water":  float(row["Water_L"]),
                "waste":  float(row["Waste_kg"]),
                "yield":  float(row["Yield_%"])
            }, "EPD"
    except Exception:
        pass

    # Tier 3: Proxy fallback
    proxy = PCR_PROXY_VALUES.get(category, {"energy": 0, "water": 0, "waste": 0, "yield": 0})
    return proxy, "PROXY"

WEIGHTS = {"energy": 0.4, "water": 0.3, "waste": 0.2, "yield": 0.1}

def normalize(series: pd.Series, inverse: bool = False) -> pd.Series:
    mn, mx = series.min(), series.max()
    norm = (series - mn) / (mx - mn) if mx > mn else 0
    return (1 - norm) if inverse else norm

def compute_composite(metrics: dict) -> float:
    df = pd.DataFrame([metrics])
    df["e_n"] = normalize(df["energy"], inverse=True)
    df["w_n"] = normalize(df["water"], inverse=True)
    df["wst_n"] = normalize(df["waste"], inverse=True)
    df["y_n"] = normalize(df["yield"], inverse=False)
    return (
        df["e_n"] * WEIGHTS["energy"] +
        df["w_n"] * WEIGHTS["water"] +
        df["wst_n"] * WEIGHTS["waste"] +
        df["y_n"] * WEIGHTS["yield"]
    ).iloc[0]

def get_or_create_score(sku: str, domain: str, category: str) -> float:
    prod = Product.query.filter_by(sku=sku).first()
    if prod:
        return prod.composite_score
    raw, source = retrieve_metrics(sku, domain, category)
    comp = compute_composite(raw)
    prod = Product(
        sku=sku, category=category,
        energy_usage=raw["energy"], water_usage=raw["water"],
        waste_generated=raw["waste"], material_yield=raw["yield"],
        composite_score=comp, data_source=source
    )
    db.session.add(prod)
    db.session.commit()
    return comp

def find_similar(sku: str, k: int = 3):
    target = Product.query.filter_by(sku=sku).first()
    if not target:
        return []

    all_peers_in_category = Product.query.filter_by(category=target.category).all()
    
    other_peers = [p for p in all_peers_in_category if p.id != target.id]

    if not other_peers:
        return []

    X_other = [[p.energy_usage, p.water_usage, p.waste_generated, p.material_yield] for p in other_peers]
    
    # Determine how many neighbors to find from other_peers
    num_neighbors_to_find = min(k, len(other_peers))

    if num_neighbors_to_find == 0:
        return []

    nn = NearestNeighbors(n_neighbors=num_neighbors_to_find).fit(X_other)
    
    target_features = [[target.energy_usage, target.water_usage, target.waste_generated, target.material_yield]]
    
    # Get indices of neighbors in X_other (and thus in other_peers)
    neighbor_indices = nn.kneighbors(target_features, return_distance=False)[0]
    
    similar_products = [other_peers[i] for i in neighbor_indices]
    
    return sorted(similar_products, key=lambda p: p.composite_score, reverse=True)
