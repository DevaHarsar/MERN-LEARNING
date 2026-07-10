import { useSelector } from "react-redux";
import "./Checkout.css";
import { useDispatch } from "react-redux";
import { getCart } from "../../service/cartService";
import { setCart } from "../../redux/cartSlice";
import { useEffect, useState } from "react";
import { placeOrder } from "../../service/orderService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderData = {
        shippingAddress,
        paymentMethod,
      };

      const response = await placeOrder(token, orderData);

      console.log(response.data);
      toast.success("Order placed successfully!");
      dispatch(setCart({ items: [] }));
      navigate("/orders");
    } catch (error) {
      console.error(error);
      toast.error("Error placing order");
    }
  };

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

  const tax = taxableAmount * 0.1;
  const shipping = subTotal > 1000 ? 0 : 100;

  const total = taxableAmount + tax + shipping;
  return (
    <>
      <h1 className="checkout-page h1">Checkout</h1>
      <div className="checkout-page">
        <div className="checkout-form-container">
          <form className="checkout-form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingAddress.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">Phone Number</label>

            <input
              type="tel"
              id="phone"
              name="phone"
              value={shippingAddress.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingAddress.address}
              onChange={handleChange}
              required
            />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingAddress.city}
              onChange={handleChange}
              required
            />
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingAddress.state}
              onChange={handleChange}
              required
            />
            <label htmlFor="zip">Zip Code:</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={shippingAddress.zip}
              onChange={handleChange}
              required
            />
          </form>
          <div className="payment-section">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="COD">Cash On Delivery</option>
              <option value="Razorpay">Razorpay</option>
            </select>
          </div>
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
      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </>
  );
}
export default Checkout;
