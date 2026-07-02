import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../redux/cartSlice";
import {
  getCart,
  updateCart,
  removeCartItem,
} from "../../service/cartService";
import { useNavigate } from "react-router-dom";
import "./Carts.css";

function Carts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const token = localStorage.getItem("token");

  const loadCart = async () => {
    try {
      const response = await getCart(token);
      dispatch(setCart(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleIncrement = async (item) => {
    try {
      await updateCart(
        token,
        item.product._id,
        item.quantity + 1
      );

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrement = async (item) => {
    if (item.quantity === 1) return;

    try {
      await updateCart(
        token,
        item.product._id,
        item.quantity - 1
      );

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (item) => {
    try {
      await removeCartItem(token, item.product._id);

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="cart-item"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.title}
              />

              <div className="cart-details">
                <h3>{item.product.title}</h3>

                <p className="price">
                  ₹{item.product.price}
                </p>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      handleDecrement(item)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleIncrement(item)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-actions">
                <p className="subtotal">
                  ₹
                  {(
                    item.product.price *
                    item.quantity
                  ).toFixed(2)}
                </p>

                <button
                  className="remove-btn"
                  onClick={() =>
                    handleRemove(item)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <h2>Total: ₹{total.toFixed(2)}</h2>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout")
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carts;