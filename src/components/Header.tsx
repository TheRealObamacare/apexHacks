import React from 'react';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-200" />
          <h1 className="text-2xl font-bold tracking-tight">Eco-Shop Assistant</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-green-200 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-200 transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-200 transition-colors duration-200">
                How It Works
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;