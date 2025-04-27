import styles from './Filters.module.css';

const CategoryFilter = ({ categories, selectedCategories, onToggleCategory }) => {
  return (
    <div className={styles.filterSection}>
      <h3 className={styles.filterTitle}>Categories</h3>
      <div className={styles.categoryList}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategories.includes(category) ? styles.selected : ''
            }`}
            onClick={() => onToggleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;