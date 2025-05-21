import { Product, ProductMetrics } from '../types/Product';
import { calculateEcoScore } from './ecoScore';

// Test dataset of tennis rackets
const testProducts: Product[] = [
  {
    id: 'babolat-pure-aero',
    sku: 'BAB-PA-2024',
    name: 'Babolat Pure Aero 2024',
    description: 'The latest Pure Aero featuring aerodynamic frame design and enhanced spin potential. Perfect for baseline players seeking maximum spin and power.',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'tennis',
    material: 'graphite-composite',
    energyKwh: 17.8,
    waterL: 420,
    wasteKg: 0.35,
    co2Kg: 3.5,
    compositeScore: 7.8,
    dataSource: 'manufacturer',
    trendUp: false
  },
  {
    id: 'wilson-blade',
    sku: 'WIL-BL-2024',
    name: 'Wilson Blade v8 2024',
    description: 'Control-oriented racket with excellent feel and precision. Features Fortyfive° technology for enhanced stability and comfort.',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'tennis',
    material: 'braided-graphite',
    energyKwh: 16.9,
    waterL: 400,
    wasteKg: 0.32,
    co2Kg: 3.2,
    compositeScore: 8.1,
    dataSource: 'manufacturer',
    trendUp: false
  },
  {
    id: 'yonex-vcore',
    sku: 'YON-VC-2024',
    name: 'Yonex VCORE 98 2024',
    description: 'Modern player racket with Liner Tech for improved spin and power. Features Isometric head shape for larger sweet spot.',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'tennis',
    material: 'graphite-composite',
    energyKwh: 18.2,
    waterL: 430,
    wasteKg: 0.38,
    co2Kg: 3.6,
    compositeScore: 7.5,
    dataSource: 'manufacturer',
    trendUp: true
  },
  {
    id: 'dunlop-fx500',
    sku: 'DUN-FX-2024',
    name: 'Dunlop FX 500 Tour 2024',
    description: 'All-court performance racket with Sonic Core technology. Offers excellent blend of power and control.',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'tennis',
    material: 'sonic-core-composite',
    energyKwh: 17.5,
    waterL: 410,
    wasteKg: 0.34,
    co2Kg: 3.4,
    compositeScore: 7.9,
    dataSource: 'manufacturer',
    trendUp: false
  },
  {
    id: 'technifibre-tfight',
    sku: 'TEC-TF-2024',
    name: 'Tecnifibre TFight 300 RS 2024',
    description: 'Premium control-oriented racket with RS technology. Designed for advanced players seeking precision.',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'tennis',
    material: 'dynacore-composite',
    energyKwh: 17.2,
    waterL: 405,
    wasteKg: 0.33,
    co2Kg: 3.3,
    compositeScore: 8.0,
    dataSource: 'manufacturer',
    trendUp: false
  }
];

// Product categories and their typical environmental impact ranges
const categoryBaselines = {
  tennis: {
    racket: {
      energyKwh: { min: 10, max: 25 },
      waterL: { min: 200, max: 800 },
      wasteKg: { min: 0.1, max: 0.8 },
      co2Kg: { min: 1.5, max: 5.0 }
    }
  }
};

// Find similar products based on category and metrics
const findSimilarProducts = (product: Product, allProducts: Product[]): Product[] => {
  return allProducts
    .filter(p => 
      p.id !== product.id && // Exclude current product
      p.category === product.category && // Match category
      Math.abs(p.compositeScore - product.compositeScore) <= 2.0 // Similar environmental impact
    )
    .sort((a, b) => {
      // Sort by composite score (higher is better)
      const scoreDiff = Math.abs(product.compositeScore - a.compositeScore) - 
                       Math.abs(product.compositeScore - b.compositeScore);
      if (scoreDiff !== 0) return scoreDiff;
      
      // Secondary sort by total environmental impact
      const aImpact = a.energyKwh + a.waterL/100 + a.wasteKg*10 + a.co2Kg*10;
      const bImpact = b.energyKwh + b.waterL/100 + b.wasteKg*10 + b.co2Kg*10;
      return aImpact - bImpact;
    })
    .slice(0, 3); // Limit to 3 alternatives
};

// Extract product info from URL
const extractProductInfo = async (url: string): Promise<Partial<Product>> => {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/').filter(Boolean);
    const brand = urlObj.hostname.split('.')[1].toUpperCase();
    
    // Handle HEAD tennis rackets
    if (urlObj.hostname.includes('head.com') && url.includes('extreme-pro')) {
      return {
        name: 'HEAD Extreme Pro Tennis Racket 2024',
        description: 'Professional-grade tennis racket featuring Graphene 360+ technology, ' +
                    'offering an optimal blend of power and control. Made with advanced composite ' +
                    'materials and featuring a 100 sq. inch head size, 16/19 string pattern, and ' +
                    'a weight of 300g unstrung.',
        imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'tennis',
        material: 'graphene-composite',
        energyKwh: 18.5,
        waterL: 450,
        wasteKg: 0.4,
        co2Kg: 3.8,
        dataSource: 'manufacturer'
      };
    }

    // For testing, return a random test product if no specific match
    return testProducts[Math.floor(Math.random() * testProducts.length)];
  } catch (error) {
    console.error('Error extracting product info:', error);
    throw error;
  }
};

// Search for similar products
const searchSimilarProducts = async (product: Product): Promise<string[]> => {
  try {
    const searchQuery = `${product.category} similar to ${product.name} sustainable eco-friendly`;
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/product-search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchQuery }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format: expected JSON');
    }

    const data = await response.json();
    return Array.isArray(data.productUrls) ? data.productUrls : [];
  } catch (error) {
    console.error('Error searching for similar products:', error);
    // Fallback to test data if API fails
    return findSimilarProducts(product, testProducts).map(p => `https://example.com/${p.id}`);
  }
};

// Main function to fetch product data
export const fetchProductData = async (url: string): Promise<{ product: Product; similar: Product[] }> => {
  try {
    const productInfo = await extractProductInfo(url);
    
    const score = calculateEcoScore({
      energy: productInfo.energyKwh || 0,
      water: productInfo.waterL || 0,
      waste: productInfo.wasteKg || 0,
      co2: productInfo.co2Kg || 0
    });

    const product: Product = {
      id: `prod-${Date.now()}`,
      sku: url.split('/').pop()?.split('.')[0] || 'unknown',
      compositeScore: score,
      trendUp: score < 7.0,
      ...productInfo as any
    };

    // Use test data for similar products during development
    const similarProducts = findSimilarProducts(product, testProducts);

    return { product, similar: similarProducts };
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
};