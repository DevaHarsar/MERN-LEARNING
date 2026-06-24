import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import "./Carts.css";
import { useNavigate } from "react-router-dom";
function Carts() {
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.images[0]} alt={item.title} />

          <div className="cart-details">
            <h3>{item.title}</h3>
            <p className="price">₹{item.price}</p>

            <div className="quantity-controls">
              <button onClick={() => dispatch(decrementQuantity(item.id))}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => dispatch(incrementQuantity(item.id))}>
                +
              </button>
            </div>
          </div>

          <div className="cart-actions">
            <p className="subtotal">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-total">
        <h2>Total: ₹{total.toFixed(2)}</h2>

        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Carts;
