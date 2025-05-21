import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ProductDetails from './ProductDetails';
import SimilarProducts from './SimilarProducts';
import { fetchProductData } from '../utils/productData';
import { Product } from '../types/Product';

const ProductSearch: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a product URL');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // For demo purposes, simulate an API call
      const { product, similar } = await fetchProductData(url);
      
      setProduct(product);
      setSimilarProducts(similar);
    } catch (err) {
      setError('Failed to fetch product data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Sustainable Alternatives</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter the URL of any product to see its environmental impact and discover more eco-friendly alternatives.
        </p>
      </div>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste product URL here"
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`py-3 px-6 ${loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
          >
            {loading ? 'Analyzing...' : 'Analyze Product'}
          </button>
        </div>
        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
      </form>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {product && (
          <>
            <div className="lg:col-span-2">
              <ProductDetails product={product} />
            </div>
            <div className="lg:col-span-3">
              <SimilarProducts products={similarProducts} />
            </div>
          </>
        )}
        
        {!product && !loading && (
          <div className="lg:col-span-5 py-16 text-center bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="flex justify-center mb-6">
                <Search className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Product Analyzed Yet</h3>
              <p className="text-gray-500">
                Enter a product URL above and click "Analyze Product" to see sustainability metrics and eco-friendly alternatives.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;