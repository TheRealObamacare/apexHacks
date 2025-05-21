import { ProductMetrics } from '../types/Product';

// Constants for eco-score calculation
const WEIGHTS = {
  energy: 0.3,
  water: 0.3,
  waste: 0.2,
  co2: 0.2
};

// Normalize a value between 0 and 1, with option to invert (lower is better)
function normalize(value: number, min: number, max: number, inverse = false): number {
  // Handle edge case to prevent division by zero
  if (max === min) return 0.5;
  
  // Normalize the value
  const normalized = (value - min) / (max - min);
  
  // Invert if necessary (for metrics where lower is better)
  return inverse ? 1 - normalized : normalized;
}

// Calculate eco-score based on product metrics
export function calculateEcoScore(metrics: ProductMetrics): number {
  // These would normally be calibrated based on industry averages
  const ranges = {
    energy: { min: 5, max: 30 },   // kWh
    water: { min: 200, max: 10000 }, // L
    waste: { min: 0.1, max: 2.0 },   // kg
    co2: { min: 1, max: 15 }        // kg CO2 equiv
  };
  
  // Calculate normalized scores (inverse because lower impact is better)
  const normalizedScores = {
    energy: normalize(metrics.energy, ranges.energy.min, ranges.energy.max, true),
    water: normalize(metrics.water, ranges.water.min, ranges.water.max, true),
    waste: normalize(metrics.waste, ranges.waste.min, ranges.waste.max, true),
    co2: normalize(metrics.co2, ranges.co2.min, ranges.co2.max, true)
  };
  
  // Calculate weighted composite score (0-10 scale)
  const compositeScore = 10 * (
    normalizedScores.energy * WEIGHTS.energy +
    normalizedScores.water * WEIGHTS.water +
    normalizedScores.waste * WEIGHTS.waste +
    normalizedScores.co2 * WEIGHTS.co2
  );
  
  // Ensure the score is within 0-10 range
  return Math.max(0, Math.min(10, compositeScore));
}

// Compare products and determine which one is more sustainable
export function compareProducts(product1: ProductMetrics, product2: ProductMetrics): {
  winner: 1 | 2 | 0;  // 1 = product1 is better, 2 = product2 is better, 0 = tie
  scoreDifference: number;
} {
  const score1 = calculateEcoScore(product1);
  const score2 = calculateEcoScore(product2);
  
  const scoreDifference = Math.abs(score1 - score2);
  
  if (scoreDifference < 0.5) {
    return { winner: 0, scoreDifference }; // Within margin of error
  }
  
  return {
    winner: score1 > score2 ? 1 : 2,
    scoreDifference
  };
}