import { useSelector } from "react-redux";
import "./Checkout.css";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);

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
              <div key={item.id} className="checkout-item">
                <img src={item.images[0]} alt={item.title} />
                <p>{item.title}</p>
                <p>
                  ₹{item.price} x {item.quantity}
                </p>
              </div>
            ))}
          </div>
          <p>
            subTotal: ₹
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
          <p>Shipping: ₹0.00</p>
          <p>Tax: ₹0.00</p>
          <p>Discount: ₹0.00</p>
          <hr />
          <p>
            Total: ₹
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
          <button className="place-order-btn">Place Order</button>
    </>
  );
}
export default Checkout;
