import styles from './ProductCard.module.css';

const ProductCard = ({ product, isSelected, onSelect }) => {
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className={styles.star}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className={styles.star}>½</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className={`${styles.star} ${styles.empty}`}>★</span>);
    }
    
    return stars;
  };

  const calculateDiscountedPrice = () => {
    if (product.discountPercentage) {
      const discountAmount = product.price * (product.discountPercentage / 100);
      return (product.price - discountAmount).toFixed(2);
    }
    return null;
  };

  const discountedPrice = calculateDiscountedPrice();

  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <div className={styles.imageContainer}>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.categoryTag}>{product.category}</div>
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description.substring(0, 60)}...</p>
        <div className={styles.priceContainer}>
          {discountedPrice ? (
            <>
              <span className={styles.originalPrice}>${product.price}</span>
              <span className={styles.discountedPrice}>${discountedPrice}</span>
              <span className={styles.discountBadge}>
                -{product.discountPercentage}%
              </span>
            </>
          ) : (
            <span className={styles.price}>${product.price}</span>
          )}
        </div>
        <div className={styles.rating}>
          {renderRatingStars(product.rating)}
          <span className={styles.ratingValue}>({product.rating})</span>
        </div>
        <button 
          className={`${styles.addToCart} ${isSelected ? styles.added : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product.id);
          }}
        >
          {isSelected ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;