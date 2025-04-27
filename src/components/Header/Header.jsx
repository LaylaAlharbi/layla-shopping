import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.css';

const Header = ({ searchQuery, onSearchChange, selectedCount }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Layla's Store</div>
      <div className={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <div className={styles.cartIndicator}>
        <span className={styles.cartIcon}>🛒</span>
        {selectedCount > 0 && (
          <span className={styles.cartCount}>{selectedCount}</span>
        )}
      </div>
    </header>
  );
};

export default Header;