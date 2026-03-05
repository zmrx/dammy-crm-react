import type { Product } from '../types/Product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-card__image"
      />
      <div className="product-card__info">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__category">
          {product.category}
        </p>
        <p className="product-card__price">${product.price}</p>
      </div>
    </div>
  );
};
