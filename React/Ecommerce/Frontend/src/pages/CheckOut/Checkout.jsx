import { useSelector } from "react-redux";
import "./Checkout.css";
import { useDispatch } from "react-redux";
import { getCart } from "../../service/cartService";
import { setCart } from "../../redux/cartSlice";
import { useEffect } from "react";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await getCart(token);
          dispatch(
            setCart(
              response.data || {
                items: [],
              },
            ),
          );
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };
    fetchCart();
  }, []);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const discount = cartItems.reduce(
    (total, item) =>
      total +
      (item.product.price * item.quantity * (item.product.discount ?? 0)) / 100,
    0,
  );

  const taxableAmount = subTotal - discount;

  const tax = taxableAmount * 0.1; // 10%

  const shipping = 0;

  const total = taxableAmount + tax + shipping;
  return (
    <>
      <h1 className="checkout-page h1">Checkout</h1>
      <div className="checkout-page">
        <div className="checkout-form-container">
          <form className="checkout-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" required />
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" required />
            <label htmlFor="state">State:</label>
            <input type="text" id="state" name="state" required />
            <label htmlFor="zip">Zip Code:</label>
            <input type="text" id="zip" name="zip" required />
          </form>
        </div>
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.product._id} className="checkout-item">
                <img src={item.product.images?.[0]} alt={item.product.title} />

                <p>{item.product.title}</p>

                <p>
                  ₹{item.product.price} × {item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button className="place-order-btn">Place Order</button>
    </>
  );
}
export default Checkout;
