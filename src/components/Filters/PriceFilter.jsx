import { useState, useEffect } from 'react';
import styles from './Filters.module.css';

const PriceFilter = ({ min, max, onPriceChange, currentMin, currentMax }) => {
  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);

  useEffect(() => {
    setLocalMin(min);
    setLocalMax(max);
  }, [min, max]);

  const handleMinChange = (e) => {
    const newValue = Number(e.target.value);
    const value = Math.max(
      currentMin, 
      Math.min(newValue, localMax - 1)
    );
    setLocalMin(value);
  };

  const handleMaxChange = (e) => {
    const newValue = Number(e.target.value);
    const value = Math.min(
      currentMax, 
      Math.max(newValue, localMin + 1)
    );
    setLocalMax(value);
  };

  const handleBlur = () => {
    onPriceChange(localMin, localMax);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onPriceChange(localMin, localMax);
    }
  };

  return (
    <div className={styles.filterSection}>
      <h3 className={styles.filterTitle}>Price Range</h3>
      <div className={styles.priceInputs}>
        <div className={styles.priceInputGroup}>
          <label htmlFor="minPrice">Min Price:</label>
          <div className={styles.priceInputWrapper}>
            <span className={styles.currency}>$</span>
            <input
              id="minPrice"
              type="number"
              min={currentMin}
              max={localMax - 1}
              value={localMin}
              onChange={(e) => setLocalMin(Number(e.target.value))}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              className={styles.priceInput}
            />
          </div>
        </div>
        <div className={styles.priceInputGroup}>
          <label htmlFor="maxPrice">Max Price:</label>
          <div className={styles.priceInputWrapper}>
            <span className={styles.currency}>$</span>
            <input
              id="maxPrice"
              type="number"
              min={localMin + 1}
              max={currentMax}
              value={localMax}
              onChange={(e) => setLocalMax(Number(e.target.value))}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              className={styles.priceInput}
            />
          </div>
        </div>
      </div>
      <div className={styles.rangeSliderContainer}>
        <input
          type="range"
          min={currentMin}
          max={currentMax}
          value={localMin}
          onChange={handleMinChange}
          onMouseUp={handleBlur}
          onTouchEnd={handleBlur}
          className={styles.rangeSlider}
        />
        <input
          type="range"
          min={currentMin}
          max={currentMax}
          value={localMax}
          onChange={handleMaxChange}
          onMouseUp={handleBlur}
          onTouchEnd={handleBlur}
          className={styles.rangeSlider}
        />
      </div>
      <div className={styles.priceDisplay}>
        Range: ${localMin} - ${localMax}
      </div>
    </div>
  );
};

export default PriceFilter;