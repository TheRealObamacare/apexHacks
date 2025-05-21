import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface SimilarProductsProps {
  products: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  const [sortBy, setSortBy] = useState<'score' | 'energy' | 'water' | 'waste' | 'co2'>('score');
  
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.compositeScore - a.compositeScore;
      case 'energy':
        return a.energyKwh - b.energyKwh;
      case 'water':
        return a.waterL - b.waterL;
      case 'waste':
        return a.wasteKg - b.wasteKg;
      case 'co2':
        return a.co2Kg - b.co2Kg;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Sustainable Alternatives
        </h3>
        
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border-0 focus:ring-0 text-gray-500 font-medium focus:outline-none bg-transparent"
          >
            <option value="score">Eco-Score</option>
            <option value="energy">Energy</option>
            <option value="water">Water</option>
            <option value="waste">Waste</option>
            <option value="co2">CO₂</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No similar products found.</p>
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;