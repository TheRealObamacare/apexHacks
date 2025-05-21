export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  material: string;
  
  // Raw LCA metrics
  energyKwh: number;
  waterL: number;
  wasteKg: number;
  co2Kg: number;
  
  // Composite score
  compositeScore: number;
  dataSource: string;
  
  // UI helpers
  trendUp: boolean;
}

export interface ProductMetrics {
  energy: number;
  water: number;
  waste: number;
  co2: number;
}