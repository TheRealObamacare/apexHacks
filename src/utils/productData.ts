import { Product, ProductMetrics } from '../types/Product';
import { calculateEcoScore } from './ecoScore';

// Test dataset of tennis rackets
const testProducts: Product[] = [
  {
    id: 'babolat-pure-aero',
    sku: 'BAB-PA-2024',
    name: 'Babolat Pure Aero 2024',
    description: 'The latest Pure Aero featuring aerodynamic frame design and enhanced spin potential. Perfect for baseline players seeking maximum spin and power.',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Default
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
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Default
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
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Default
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
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Default
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
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Default
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

// Helper to extract brand from a Product or URL
const extractBrand = (product: Partial<Product>, url?: string): string => {
  if (product && product.brand) return String(product.brand).toUpperCase();
  if (product && product.name && product.name.toLowerCase().includes('babolat')) return 'BABOLAT';
  if (product && product.name && product.name.toLowerCase().includes('wilson')) return 'WILSON';
  if (product && product.name && product.name.toLowerCase().includes('yonex')) return 'YONEX';
  if (product && product.name && product.name.toLowerCase().includes('dunlop')) return 'DUNLOP';
  if (product && product.name && product.name.toLowerCase().includes('tecnifibre')) return 'TECNIFIBRE';
  if (url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.split('.')[1]?.toUpperCase() || 'UNKNOWN';
    } catch { return 'UNKNOWN'; }
  }
  return 'UNKNOWN';
};

// Find similar products based on category, metrics, and different brand
const findSimilarProducts = (product: Product, allProducts: Product[]): Product[] => {
  const originalBrand = extractBrand(product, product.sku);
  return allProducts
    .filter(p => 
      p.id !== product.id && // Exclude current product
      p.category === product.category && // Match category
      Math.abs(p.compositeScore - product.compositeScore) <= 2.0 && // Similar environmental impact
      extractBrand(p, p.sku) !== originalBrand // Different brand
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
  let scrapedImageUrl: string | undefined;
  let scrapedDescription: string | undefined;
  let scrapedBrand: string | undefined;
  let scrapedName: string | undefined;
  let scrapedCategory: string | undefined;
  let scrapedMaterial: string | undefined;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const html = await response.text();
      // 1. Try to parse JSON-LD for rich product data
      const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
      if (jsonLdMatches) {
        for (const match of jsonLdMatches) {
          try {
            const jsonText = match.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/i, '').replace(/<\/script>/i, '');
            const data = JSON.parse(jsonText.trim());
            // Handle array or object
            const productData = Array.isArray(data) ? data.find(d => d['@type'] === 'Product') : (data['@type'] === 'Product' ? data : null);
            if (productData) {
              if (productData.image) {
                scrapedImageUrl = Array.isArray(productData.image) ? productData.image[0] : productData.image;
              }
              if (productData.description) {
                scrapedDescription = productData.description;
              }
              if (productData.brand) {
                scrapedBrand = typeof productData.brand === 'string' ? productData.brand : productData.brand.name;
              }
              if (productData.name) {
                scrapedName = productData.name;
              }
              if (productData.category) {
                scrapedCategory = productData.category;
              }
              if (productData.material) {
                scrapedMaterial = productData.material;
              }
              break; // Prefer first valid Product
            }
          } catch (e) { /* ignore JSON parse errors */ }
        }
      }
      // 2. Fallback to og:image
      if (!scrapedImageUrl) {
        const ogImageMatch = html.match(/<meta\s+(?:name|property)=["']og:image["']\s+content=["']([^"']+)["']/i);
        if (ogImageMatch && ogImageMatch[1]) {
          scrapedImageUrl = new URL(ogImageMatch[1], url).href;
        }
      }
      // 3. Fallback to first large <img> on the page
      if (!scrapedImageUrl) {
        const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
        if (imgMatch && imgMatch[1]) {
          scrapedImageUrl = new URL(imgMatch[1], url).href;
        }
      }
      // 4. Fallback to meta description
      if (!scrapedDescription) {
        const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
        if (metaDescMatch && metaDescMatch[1]) {
          scrapedDescription = metaDescMatch[1];
        }
      }
      // 5. Fallback to product detail containers
      if (!scrapedDescription) {
        const detailMatch = html.match(/<div[^>]+class=["'][^"']*(product-description|description)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
        if (detailMatch && detailMatch[2]) {
          scrapedDescription = detailMatch[2].replace(/<[^>]+>/g, '').trim();
        }
      }
      // 6. Fallback to <title>
      if (!scrapedName) {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
          scrapedName = titleMatch[1];
        }
      }
    }
  } catch (scrapeError) {
    console.warn(`Failed to scrape product info from ${url}:`, scrapeError);
  }

  try {
    const urlObj = new URL(url);
    // Use scrapedBrand if available, else fallback to domain
    const brand = scrapedBrand || urlObj.hostname.split('.')[1]?.toUpperCase() || 'UNKNOWN';
    // Compose product data
    const productData: Partial<Product> = {
      name: scrapedName,
      description: scrapedDescription,
      imageUrl: scrapedImageUrl,
      category: scrapedCategory,
      material: scrapedMaterial,
      brand,
      // Brand is now a field in Product
    };
    // If we have at least name and image, return
    if (productData.name && productData.imageUrl) {
      return productData;
    }
    // Otherwise, fallback to test product but use any scraped fields
    const baseProduct = { ...testProducts[Math.floor(Math.random() * testProducts.length)] };
    if (scrapedImageUrl) baseProduct.imageUrl = scrapedImageUrl;
    if (scrapedDescription) baseProduct.description = scrapedDescription;
    if (scrapedName) baseProduct.name = scrapedName;
    if (scrapedCategory) baseProduct.category = scrapedCategory;
    if (scrapedMaterial) baseProduct.material = scrapedMaterial;
    baseProduct.brand = brand;
    // Mark as fallback
    baseProduct.fallbackWarning = true;
    // If we have at least name and image now, return
    if (baseProduct.name && baseProduct.imageUrl) {
      return baseProduct;
    }
    // If all else fails, throw
    throw new Error('Failed to extract product info from URL and fallbacks.');
  } catch (error) {
    console.error('Error in extractProductInfo (after potential scrape attempt):', error);
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
    if ((productInfo as any).fallbackWarning) {
      product.fallbackWarning = true;
    }
    if (productInfo.brand) {
      product.brand = productInfo.brand;
    }
    let resolvedSimilarProducts: Product[] = [];
    try {
      const similarProductUrls = await searchSimilarProducts(product);
      for (const similarUrl of similarProductUrls.slice(0, 3)) { 
        try {
          const partialInfo = await extractProductInfo(similarUrl);
          const metrics: ProductMetrics = {
            energy: partialInfo.energyKwh || 0,
            water: partialInfo.waterL || 0,
            waste: partialInfo.wasteKg || 0,
            co2: partialInfo.co2Kg || 0,
          };
          const score = calculateEcoScore(metrics);
          const similarProd: Product = {
            id: `similar-${partialInfo.id || Math.random().toString(36).substr(2, 9)}`,
            sku: partialInfo.sku || similarUrl.split('/').pop()?.split('.')[0] || 'unknown-sku',
            name: partialInfo.name || 'Similar Product',
            description: partialInfo.description || 'No description available.',
            imageUrl: partialInfo.imageUrl || 'https://via.placeholder.com/300x200.png?text=No+Image',
            category: partialInfo.category || product.category, 
            material: partialInfo.material || 'Unknown',
            energyKwh: metrics.energy,
            waterL: metrics.water,
            wasteKg: metrics.waste,
            co2Kg: metrics.co2,
            compositeScore: score,
            dataSource: partialInfo.dataSource || 'scraped-suggestion',
            trendUp: score < 7.0, 
            fallbackWarning: (partialInfo as any).fallbackWarning || false,
            brand: partialInfo.brand || extractBrand(partialInfo, similarUrl)
          };
          resolvedSimilarProducts.push(similarProd);
        } catch (e) {
          console.warn(`Failed to process similar product URL ${similarUrl}:`, e);
        }
      }
    } catch (e) {
        console.error("Error fetching/processing similar product URLs:", e);
    }
    if (resolvedSimilarProducts.length === 0) {
      console.log("No similar products found via API or processing failed, falling back to local test data for suggestions.");
      resolvedSimilarProducts = findSimilarProducts(product, testProducts);
    }
    return { product, similar: resolvedSimilarProducts };
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
};