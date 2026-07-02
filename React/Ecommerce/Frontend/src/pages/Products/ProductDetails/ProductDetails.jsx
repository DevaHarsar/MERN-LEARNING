import { useParams } from "react-router-dom";
import ProductList from "../ProductList/ProductList";
import { useEffect } from "react";
import { useState } from "react";
import "./ProductDetails.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../../../redux/cartSlice";
import { addToCart } from "../../../service/cartService";

function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);

  const dispatch = useDispatch();

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search] = useState("");
  const [category] = useState("All");
  const [sort] = useState("");
  const [addCommentModel, setAddCommentModel] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
        );
        console.log(response.data);
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const [count, setCount] = useState(1);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await addToCart(token, productDetails._id, count);

      dispatch(setCart(response.data));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // const productDetails = {
  //   id: params.id,
  //   name: `Product ${params.id}`,
  //   price: 29.99,
  //   image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   comments: [
  //     {
  //       id: 1,
  //       username: "John Doe",
  //       comment: "Great product! Highly recommend.",
  //     },
  //     {
  //       id: 2,
  //       username: "Jane Smith",
  //       comment: "Good value for the price.",
  //     },
  //   ],
  // };

  if (!productDetails) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div className="product-details">
        <h1>Product Details</h1>
        <div className="product-main">
          <div className="product-image">
            <img src={productDetails?.images[0]} alt={productDetails?.title} />
          </div>
          <div className="product-info">
            <h2>{productDetails.title}</h2>

            <h3>₹{productDetails.price}</h3>

            <p>{productDetails.description}</p>

            <div className="quantity-selector">
              <button className="quantity-btn" onClick={decreaseCount}>
                -
              </button>
              <span className="quantity-value">{count}</span>
              <button
                className="quantity-btn"
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
            </div>

            <button className="cart-btn" onClick={handleAddToCart}>
              Add To Cart
            </button>

            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
        <div className="product-comments">
          <div className="add-comment">
            <h2>Comments:</h2>
            <button
              onClick={() =>
                isAuthenticated ? setAddCommentModel(true) : navigate("/login")
              }
              className="add-comment-btn"
            >
              Add Comment
            </button>
          </div>
          <ul>
            {productDetails.reviews?.map((review, index) => (
              <li key={index}>
                <strong>{review.reviewerName}:</strong>
                {review.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProductList search={search} category={category} sort={sort} />
      {addCommentModel && (
        <div className="modal-overlay">
          <div className="add-comment-modal">
            <form className="add-comment-form">
              <h2>Add Comment</h2>
              <label htmlFor="reviewerName">Name:</label>
              <input
                type="text"
                id="reviewerName"
                placeholder="Enter your name"
              />
              <label htmlFor="comment">Comment:</label>
              <textarea id="comment" placeholder="Enter your comment" />
              <button type="submit">Submit Comment</button>
              <button type="button" onClick={() => setAddCommentModel(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
