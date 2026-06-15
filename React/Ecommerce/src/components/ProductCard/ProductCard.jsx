import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, role }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">Category:{product.category}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      {role === "user" || role === undefined ? (
        <>
          <button
            className="add-to-cart-button"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to Cart");
            }}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <div className="admin-buttons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Edit");
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete");
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
