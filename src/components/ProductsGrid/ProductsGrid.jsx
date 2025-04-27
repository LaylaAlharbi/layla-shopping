import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsGrid.module.css';

const ProductsGrid = ({ products, selectedProducts, onProductSelect }) => {
  if (products.length === 0) {
    return <div className={styles.noResults}>No products found matching your search.</div>;
  }

  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          isSelected={selectedProducts.has(product.id)}
          onSelect={() => onProductSelect(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;