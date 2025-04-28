import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import ProductsGrid from './components/ProductsGrid/ProductsGrid';
import SortControls from './components/SortControls/SortControls';
import CategoryFilter from './components/Filters/CategoryFilter';
import PriceFilter from './components/Filters/PriceFilter';
import styles from './App.module.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
        
        // Set initial price range based on actual product prices
        const prices = data.products.map(p => p.price);
        setPriceRange({
          min: Math.floor(Math.min(...prices)),
          max: Math.ceil(Math.max(...prices))
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply sorting
    filtered = sortProducts(filtered, sortOption);
    
    setFilteredProducts(filtered);
  }, [searchQuery, products, sortOption, selectedCategories, priceRange]);

  const sortProducts = (products, option) => {
    const sorted = [...products];
    switch (option) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'discount':
        return sorted.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
      default:
        return sorted;
    }
  };

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(productId)) {
        newSelection.delete(productId);
      } else {
        newSelection.add(productId);
      }
      return newSelection;
    });
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };

  if (loading) return <div className={styles.loadingContainer}><div className={styles.loading}>Loading products...</div></div>;
  if (error) return <div className={styles.errorContainer}><div className={styles.error}>Error: {error}</div></div>;

  return (
    <div className={styles.app}>
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCount={selectedProducts.size}
      />
      <main className={styles.mainContent}>
        <div className={styles.filtersContainer}>
          <CategoryFilter 
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />
          <PriceFilter 
            min={priceRange.min}
            max={priceRange.max}
            onPriceChange={handlePriceChange}
            currentMax={Math.max(...products.map(p => p.price))}
            currentMin={Math.min(...products.map(p => p.price))}
          />
        </div>
        <SortControls 
          sortOption={sortOption}
          onSortChange={setSortOption}
          productCount={filteredProducts.length}
        />
        <ProductsGrid 
          products={filteredProducts} 
          selectedProducts={selectedProducts}
          onProductSelect={toggleProductSelection}
        />
      </main>
      <footer className={styles.footer}>
        <p>© 2025 Layla's Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;