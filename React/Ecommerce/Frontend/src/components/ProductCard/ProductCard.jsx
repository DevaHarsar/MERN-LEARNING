import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { setCart } from "../../redux/cartSlice";
import { addToCart } from "../../service/cartService";

function ProductCard({ product, role, onDelete }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isInCart = cartItems.some(
    (item) => item.product?._id === product._id
  );

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDeleteModal]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${product._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDelete(product._id);
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (role === undefined) {
      navigate("/login");
      return;
    }

    if (isInCart) {
      navigate("/cartPage");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await addToCart(token, product._id);

      dispatch(setCart(response.data));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <div
        className={`product-card ${showDeleteModal ? "modal-open" : ""}`}
        onClick={() => {
          if (product.stock === 0) return;
          navigate(`/products/${product._id}`);
        }}
      >
        <img
          src={product.images?.[0] || product.thumbnail}
          alt={product.title}
          className="product-image"
        />

        <h3 className="product-name">{product.title}</h3>

        <p className="product-category">
          Category: {product.category}
        </p>

        <p className="product-description">
          {product.description}
        </p>

        <p className="product-price">
          ₹{product.price}
        </p>

        {role === "user" || role === undefined ? (
          <>
            <p className="product-stock">
              {product.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </p>

            <button
              className={
                isInCart
                  ? "go-to-cart-button"
                  : "add-to-cart-button"
              }
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              {product.stock === 0
                ? "Out of Stock"
                : isInCart
                ? "🛒 Go to Cart"
                : "Add to Cart"}
            </button>
          </>
        ) : (
          <>
            <p className="product-stock">
              Stock: {product.stock}
            </p>

            <div className="admin-buttons">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/admin/products/${product._id}/edit`
                  );
                }}
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>
          </>
        )}

        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="delete-modal-content">
              <p>
                Are you sure you want to delete this
                product?
              </p>

              <h3>{product.title}</h3>

              <div className="delete-modal-buttons">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                >
                  Yes
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductCard;