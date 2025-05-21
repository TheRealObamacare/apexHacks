import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ProductSearch from './components/ProductSearch';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-teal-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <ProductSearch />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;