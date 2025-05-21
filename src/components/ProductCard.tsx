import React from 'react';
import { Leaf } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow">
          <div className="flex items-center justify-center bg-green-100 rounded-full h-9 w-9">
            <span className="text-sm font-bold text-green-700">{product.compositeScore.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-1 truncate">
          {product.name}
        </h4>
        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-2">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Energy:</span>
            <span className="font-medium">{product.energyKwh} kWh</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Water:</span>
            <span className="font-medium">{product.waterL} L</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Waste:</span>
            <span className="font-medium">{product.wasteKg} kg</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">CO₂:</span>
            <span className="font-medium">{product.co2Kg} kg</span>
          </div>
        </div>
        
        <button className="w-full py-2 px-3 text-sm bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center transition-colors duration-200">
          <Leaf className="h-4 w-4 mr-1" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;