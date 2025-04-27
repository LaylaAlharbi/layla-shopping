import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
      <span className={styles.searchIcon}>🔍</span>
    </div>
  );
};

export default SearchBar;