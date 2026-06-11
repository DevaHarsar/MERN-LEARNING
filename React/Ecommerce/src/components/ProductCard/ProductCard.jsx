import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
 const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
