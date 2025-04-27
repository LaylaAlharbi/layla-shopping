import styles from './SortControls.module.css';

const SortControls = ({ sortOption, onSortChange, productCount }) => {
  return (
    <div className={styles.sortContainer}>
      <div className={styles.productCount}>{productCount} products</div>
      <div className={styles.sortOptions}>
        <label htmlFor="sort-select" className={styles.sortLabel}>Sort by:</label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="title-asc">Name: A to Z</option>
          <option value="title-desc">Name: Z to A</option>
          <option value="discount">Discount %</option>
        </select>
      </div>
    </div>
  );
};

export default SortControls;