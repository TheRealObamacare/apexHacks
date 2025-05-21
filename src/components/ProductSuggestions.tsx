import React, { useMemo } from 'react';

export interface ProductSuggestion {
  url: string;
  fallback: any;
  alternatives: any[];
}

// Diverse product suggestions with fallback solution data and alternatives
export const PRODUCT_SUGGESTIONS: ProductSuggestion[] = [
  {
    url: "https://www.example.com/product/tennis-racket-1",
    fallback: {
      name: "Babolat Pure Aero 2023",
      description: "Spin-friendly tennis racket for advanced players.",
      imageUrl: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&fit=crop&w=400&q=80",
      category: "tennis",
      material: "graphite-composite",
      energyKwh: 18.0,
      waterL: 420,
      wasteKg: 0.35,
      co2Kg: 3.5,
      dataSource: "manufacturer"
    },
    alternatives: [
      {
        name: "Wilson Blade v8 2024",
        description: "Control-oriented racket with excellent feel and precision.",
        imageUrl: "https://images.pexels.com/photos/1432037/pexels-photo-1432037.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "tennis",
        material: "braided-graphite",
        energyKwh: 16.9,
        waterL: 400,
        wasteKg: 0.32,
        co2Kg: 3.2,
        dataSource: "manufacturer"
      },
      {
        name: "Yonex VCORE 98 2024",
        description: "Modern player racket with Liner Tech for improved spin and power.",
        imageUrl: "https://images.pexels.com/photos/1432038/pexels-photo-1432038.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "tennis",
        material: "graphite-composite",
        energyKwh: 18.2,
        waterL: 430,
        wasteKg: 0.38,
        co2Kg: 3.6,
        dataSource: "manufacturer"
      },
      {
        name: "Dunlop FX 500 Tour 2024",
        description: "All-court performance racket with Sonic Core technology.",
        imageUrl: "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "tennis",
        material: "sonic-core-composite",
        energyKwh: 17.5,
        waterL: 410,
        wasteKg: 0.34,
        co2Kg: 3.4,
        dataSource: "manufacturer"
      }
    ]
  },
  {
    url: "https://www.example.com/product/tshirt-1",
    fallback: {
      name: "Uniqlo Men's Supima Cotton Crew Neck T-Shirt",
      description: "Soft, high-quality Supima cotton t-shirt.",
      imageUrl: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&fit=crop&w=400&q=80",
      category: "tshirt",
      material: "cotton",
      energyKwh: 5.0,
      waterL: 2500,
      wasteKg: 0.18,
      co2Kg: 2.3,
      dataSource: "usda"
    },
    alternatives: [
      {
        name: "H&M Regular Fit T-shirt",
        description: "A soft cotton t-shirt for everyday comfort.",
        imageUrl: "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "tshirt",
        material: "cotton",
        energyKwh: 5.5,
        waterL: 2700,
        wasteKg: 0.2,
        co2Kg: 2.5,
        dataSource: "usda"
      },
      {
        name: "Patagonia Men's Capilene Cool Daily Shirt",
        description: "Technical, quick-drying shirt made from recycled polyester.",
        imageUrl: "https://images.pexels.com/photos/936075/pexels-photo-936075.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "tshirt",
        material: "recycled-polyester",
        energyKwh: 6.0,
        waterL: 800,
        wasteKg: 0.15,
        co2Kg: 2.0,
        dataSource: "proxy"
      }
    ]
  },
  {
    url: "https://www.example.com/product/headphones-1",
    fallback: {
      name: "Sony WH-1000XM5 Headphones",
      description: "Industry-leading noise canceling wireless headphones.",
      imageUrl: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&fit=crop&w=400&q=80",
      category: "electronics",
      material: "plastic",
      energyKwh: 10.0,
      waterL: 400,
      wasteKg: 0.2,
      co2Kg: 4.0,
      dataSource: "proxy"
    },
    alternatives: [
      {
        name: "Bose QuietComfort 35 II",
        description: "Wireless Bluetooth headphones with world-class noise cancellation.",
        imageUrl: "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "electronics",
        material: "plastic",
        energyKwh: 9.0,
        waterL: 350,
        wasteKg: 0.18,
        co2Kg: 3.8,
        dataSource: "proxy"
      },
      {
        name: "JBL Tune 500BT",
        description: "Wireless on-ear headphones with deep bass sound.",
        imageUrl: "https://images.pexels.com/photos/1648538/pexels-photo-1648538.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "electronics",
        material: "plastic",
        energyKwh: 8.5,
        waterL: 300,
        wasteKg: 0.15,
        co2Kg: 3.5,
        dataSource: "proxy"
      }
    ]
  },
  {
    url: "https://www.example.com/product/shoes-1",
    fallback: {
      name: "Adidas Ultraboost 22",
      description: "High-performance running shoes with responsive cushioning.",
      imageUrl: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&fit=crop&w=400&q=80",
      category: "footwear",
      material: "synthetic",
      energyKwh: 11.0,
      waterL: 700,
      wasteKg: 0.4,
      co2Kg: 5.5,
      dataSource: "proxy"
    },
    alternatives: [
      {
        name: "Nike Air Max 270",
        description: "Iconic Nike sneakers with visible Air cushioning.",
        imageUrl: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "footwear",
        material: "synthetic",
        energyKwh: 12.0,
        waterL: 800,
        wasteKg: 0.5,
        co2Kg: 6.0,
        dataSource: "proxy"
      },
      {
        name: "Allbirds Tree Runners",
        description: "Eco-friendly running shoes made from eucalyptus tree fiber.",
        imageUrl: "https://images.pexels.com/photos/936075/pexels-photo-936075.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "footwear",
        material: "eucalyptus-fiber",
        energyKwh: 8.0,
        waterL: 400,
        wasteKg: 0.3,
        co2Kg: 3.0,
        dataSource: "proxy"
      }
    ]
  },
  {
    url: "https://www.example.com/product/smartphone-1",
    fallback: {
      name: "Apple iPhone 14 Pro",
      description: "Apple's latest smartphone with advanced camera and display.",
      imageUrl: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&fit=crop&w=400&q=80",
      category: "electronics",
      material: "aluminum-glass",
      energyKwh: 70.0,
      waterL: 1200,
      wasteKg: 1.2,
      co2Kg: 70.0,
      dataSource: "proxy"
    },
    alternatives: [
      {
        name: "Samsung Galaxy S23 Ultra",
        description: "Flagship Android smartphone with advanced camera system.",
        imageUrl: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "electronics",
        material: "aluminum-glass",
        energyKwh: 68.0,
        waterL: 1100,
        wasteKg: 1.1,
        co2Kg: 68.0,
        dataSource: "proxy"
      },
      {
        name: "Fairphone 4",
        description: "Ethically produced, modular smartphone for easy repair.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Fairphone_4.jpg",
        category: "electronics",
        material: "recycled-plastic",
        energyKwh: 50.0,
        waterL: 900,
        wasteKg: 0.8,
        co2Kg: 40.0,
        dataSource: "proxy"
      }
    ]
  },
  {
    url: "https://www.example.com/product/jacket-1",
    fallback: {
      name: "Patagonia Down Sweater Jacket",
      description: "Lightweight, windproof, and warm jacket made with recycled materials.",
      imageUrl: "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&fit=crop&w=400&q=80",
      category: "jacket",
      material: "recycled-polyester",
      energyKwh: 8.0,
      waterL: 500,
      wasteKg: 0.3,
      co2Kg: 4.0,
      dataSource: "proxy"
    },
    alternatives: [
      {
        name: "Columbia Fleece Jacket",
        description: "Warm fleece jacket for outdoor adventures.",
        imageUrl: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "jacket",
        material: "fleece",
        energyKwh: 7.5,
        waterL: 480,
        wasteKg: 0.28,
        co2Kg: 3.8,
        dataSource: "proxy"
      },
      {
        name: "The North Face Eco Jacket",
        description: "Eco-friendly jacket made from recycled materials.",
        imageUrl: "https://images.pexels.com/photos/1707829/pexels-photo-1707829.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "jacket",
        material: "recycled-polyester",
        energyKwh: 8.2,
        waterL: 510,
        wasteKg: 0.32,
        co2Kg: 4.1,
        dataSource: "proxy"
      }
    ]
  },
  {
    url: "https://www.example.com/product/tshirt-2",
    fallback: {
      name: "Uniqlo Men's Supima Cotton Crew Neck T-Shirt",
      description: "Soft, high-quality Supima cotton t-shirt.",
      imageUrl: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&fit=crop&w=400&q=80",
      category: "tshirt",
      material: "cotton",
      energyKwh: 5.0,
      waterL: 2500,
      wasteKg: 0.18,
      co2Kg: 2.3,
      dataSource: "usda"
    },
    alternatives: [
      {
        name: "H&M Regular Fit T-shirt",
        description: "A soft cotton t-shirt for everyday comfort.",
        imageUrl: "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "tshirt",
        material: "cotton",
        energyKwh: 5.5,
        waterL: 2700,
        wasteKg: 0.2,
        co2Kg: 2.5,
        dataSource: "usda"
      },
      {
        name: "Patagonia Men's Capilene Cool Daily Shirt",
        description: "Technical, quick-drying shirt made from recycled polyester.",
        imageUrl: "https://images.pexels.com/photos/936075/pexels-photo-936075.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "tshirt",
        material: "recycled-polyester",
        energyKwh: 6.0,
        waterL: 800,
        wasteKg: 0.15,
        co2Kg: 2.0,
        dataSource: "proxy"
      }
    ]
  },
  {
    url: "https://www.example.com/product/headphones-2",
    fallback: {
      name: "Sony WH-1000XM5 Headphones",
      description: "Industry-leading noise canceling wireless headphones.",
      imageUrl: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&fit=crop&w=400&q=80",
      category: "electronics",
      material: "plastic",
      energyKwh: 10.0,
      waterL: 400,
      wasteKg: 0.2,
      co2Kg: 4.0,
      dataSource: "proxy"
    },
    alternatives: [
      {
        name: "Bose QuietComfort 35 II",
        description: "Wireless Bluetooth headphones with world-class noise cancellation.",
        imageUrl: "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "electronics",
        material: "plastic",
        energyKwh: 9.0,
        waterL: 350,
        wasteKg: 0.18,
        co2Kg: 3.8,
        dataSource: "proxy"
      },
      {
        name: "JBL Tune 500BT",
        description: "Wireless on-ear headphones with deep bass sound.",
        imageUrl: "https://images.pexels.com/photos/1648538/pexels-photo-1648538.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "electronics",
        material: "plastic",
        energyKwh: 8.5,
        waterL: 300,
        wasteKg: 0.15,
        co2Kg: 3.5,
        dataSource: "proxy"
      }
    ]
  },
  {
    url: "https://www.example.com/product/shoes-2",
    fallback: {
      name: "Adidas Ultraboost 22",
      description: "High-performance running shoes with responsive cushioning.",
      imageUrl: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&fit=crop&w=400&q=80",
      category: "footwear",
      material: "synthetic",
      energyKwh: 11.0,
      waterL: 700,
      wasteKg: 0.4,
      co2Kg: 5.5,
      dataSource: "proxy"
    },
    alternatives: [
      {
        name: "Nike Air Max 270",
        description: "Iconic Nike sneakers with visible Air cushioning.",
        imageUrl: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "footwear",
        material: "synthetic",
        energyKwh: 12.0,
        waterL: 800,
        wasteKg: 0.5,
        co2Kg: 6.0,
        dataSource: "proxy"
      },
      {
        name: "Allbirds Tree Runners",
        description: "Eco-friendly running shoes made from eucalyptus tree fiber.",
        imageUrl: "https://images.pexels.com/photos/936075/pexels-photo-936075.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "footwear",
        material: "eucalyptus-fiber",
        energyKwh: 8.0,
        waterL: 400,
        wasteKg: 0.3,
        co2Kg: 3.0,
        dataSource: "proxy"
      }
    ]
  },
  {
    url: "https://www.example.com/product/smartphone-2",
    fallback: {
      name: "Apple iPhone 14 Pro",
      description: "Apple's latest smartphone with advanced camera and display.",
      imageUrl: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&fit=crop&w=400&q=80",
      category: "electronics",
      material: "aluminum-glass",
      energyKwh: 70.0,
      waterL: 1200,
      wasteKg: 1.2,
      co2Kg: 70.0,
      dataSource: "proxy"
    },
    alternatives: [
      {
        name: "Samsung Galaxy S23 Ultra",
        description: "Flagship Android smartphone with advanced camera system.",
        imageUrl: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "electronics",
        material: "aluminum-glass",
        energyKwh: 68.0,
        waterL: 1100,
        wasteKg: 1.1,
        co2Kg: 68.0,
        dataSource: "proxy"
      },
      {
        name: "Fairphone 4",
        description: "Ethically produced, modular smartphone for easy repair.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Fairphone_4.jpg",
        category: "electronics",
        material: "recycled-plastic",
        energyKwh: 50.0,
        waterL: 900,
        wasteKg: 0.8,
        co2Kg: 40.0,
        dataSource: "proxy"
      }
    ]
  },
  {
    url: "https://www.example.com/product/jacket-2",
    fallback: {
      name: "Patagonia Down Sweater Jacket",
      description: "Lightweight, windproof, and warm jacket made with recycled materials.",
      imageUrl: "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&fit=crop&w=400&q=80",
      category: "jacket",
      material: "recycled-polyester",
      energyKwh: 8.0,
      waterL: 500,
      wasteKg: 0.3,
      co2Kg: 4.0,
      dataSource: "proxy"
    },
    alternatives: [
      {
        name: "Columbia Fleece Jacket",
        description: "Warm fleece jacket for outdoor adventures.",
        imageUrl: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "jacket",
        material: "fleece",
        energyKwh: 7.5,
        waterL: 480,
        wasteKg: 0.28,
        co2Kg: 3.8,
        dataSource: "proxy"
      },
      {
        name: "The North Face Eco Jacket",
        description: "Eco-friendly jacket made from recycled materials.",
        imageUrl: "https://images.pexels.com/photos/1707829/pexels-photo-1707829.jpeg?auto=compress&fit=crop&w=400&q=80",
        category: "jacket",
        material: "recycled-polyester",
        energyKwh: 8.2,
        waterL: 510,
        wasteKg: 0.32,
        co2Kg: 4.1,
        dataSource: "proxy"
      }
    ]
  }
];

function getRandomSuggestions(count = 4) {
  const shuffled = [...PRODUCT_SUGGESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

interface ProductSuggestionsProps {
  onSuggest: (url: string, fallback: any, alternatives: any[]) => void;
}

const ProductSuggestions: React.FC<ProductSuggestionsProps> = ({ onSuggest }) => {
  const suggestions = useMemo(() => getRandomSuggestions(4), []);
  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold mb-4">Try analyzing one of these products:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {suggestions.map((s, idx) => (
          <button
            key={s.url}
            className="bg-white rounded shadow p-4 flex flex-col items-center hover:bg-green-50 transition"
            onClick={() => onSuggest(s.url, s.fallback, s.alternatives)}
          >
            <img src={s.fallback.imageUrl} alt={s.fallback.name} className="h-24 object-contain mb-2" />
            <span className="font-medium text-center">{s.fallback.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductSuggestions; 