import React from 'react';
import { Github, Twitter, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-green-400" />
              <h2 className="text-xl font-bold">Carbon Compass</h2>
            </div>
            <p className="text-gray-400">
              Helping you make more sustainable shopping choices with accurate environmental impact data.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors duration-200">About</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors duration-200">How It Works</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Carbon Compass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;