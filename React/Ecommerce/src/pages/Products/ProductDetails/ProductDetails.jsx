import { useParams } from "react-router-dom";
import ProductList from "../ProductList/ProductList";
import { useEffect } from "react";
import { useState } from "react";
import "./ProductDetails.css";

function ProductDetails() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  
  const params = useParams();
  const { id } = useParams();

  const[count, setCount] = useState(1);

  const decreaseCount = () =>{
    if(count > 1){
        setCount(count-1);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const productDetails = {
    id: params.id,
    name: `Product ${params.id}`,
    price: 29.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    comments: [
      {
        id: 1,
        username: "John Doe",
        comment: "Great product! Highly recommend.",
      },
      {
        id: 2,
        username: "Jane Smith",
        comment: "Good value for the price.",
      },
    ],
  };

  return (
    <>
      <div className="product-details">
        <h1>Product Details</h1>
        <div className="product-main">
          <div className="product-image">
            <img
              src={productDetails.image}
              alt={productDetails.name}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
          </div>
          <div className="product-info">
            <h2>{productDetails.name}</h2>

            <h3>${productDetails.price}</h3>

            <p>{productDetails.description}</p>

            <div className="quantity-selector">
                <button className="quantity-btn" onClick={decreaseCount}>-</button>
                <span className="quantity-value">{count}</span>
                <button className="quantity-btn" onClick={()=>setCount(count+1)}>+</button>
            </div>

            <button className="cart-btn">Add To Cart</button>

            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
        <div className="product-comments">
          <h2>Comments:</h2>
          <ul>
            {productDetails.comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.username}:</strong> {comment.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProductList search={search} category={category} sort={sort} />
    </>
  );
}

export default ProductDetails;
