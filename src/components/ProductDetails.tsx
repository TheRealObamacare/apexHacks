import React from 'react';
import { ArrowDownRight, ArrowUpRight, Droplet, Zap, Trash2, Leaf } from 'lucide-react';
import { Product } from '../types/Product';
import MetricCard from './MetricCard';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <div className="flex items-center justify-center bg-green-100 rounded-full h-12 w-12">
            <span className="text-lg font-bold text-green-700">{product.compositeScore.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {product.category}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {product.material}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
            Source: {product.dataSource}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <MetricCard 
            icon={<Zap className="h-5 w-5 text-amber-500" />}
            title="Energy"
            value={`${product.energyKwh} kWh`}
            color="amber"
          />
          <MetricCard 
            icon={<Droplet className="h-5 w-5 text-blue-500" />}
            title="Water"
            value={`${product.waterL} L`}
            color="blue"
          />
          <MetricCard 
            icon={<Trash2 className="h-5 w-5 text-red-500" />}
            title="Waste"
            value={`${product.wasteKg} kg`}
            color="red"
          />
          <MetricCard 
            icon={<Leaf className="h-5 w-5 text-green-500" />}
            title="CO₂"
            value={`${product.co2Kg} kg`}
            color="green"
          />
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-1">
            {product.trendUp ? (
              <>
                <ArrowUpRight className="h-4 w-4 text-red-500" />
                <span className="text-xs text-red-600">Higher impact than average</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-600">Lower impact than average</span>
              </>
            )}
          </div>
          <a 
            href="#"
            className="text-sm font-medium text-green-600 hover:text-green-800"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;