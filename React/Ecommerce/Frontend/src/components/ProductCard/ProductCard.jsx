import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, role }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="product-image"
      />
      <h3 className="product-name">{product.title}</h3>
      <p className="product-category">Category:{product.category}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      {role === "user" || role === undefined ? (
        <>
          <p className="product-stock">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <button
            className="add-to-cart-button"
            disabled={product.stock === 0}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to Cart");
            }}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <>
          <p className="product-stock">Stock: {product.stock}</p>
          <div className="admin-buttons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/products/${product.id}/edit`);
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
        </>
      )}
    </div>
  );
}

export default ProductCard;
