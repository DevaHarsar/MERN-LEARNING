import "./OrderDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../service/orderService";
import LoaderComponent from "../../../components/LoaderComponent/LoaderComponent"

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchOrder = async () => {
        try {
          const token = localStorage.getItem("token");
    
          const response = await getOrderById(token, id);
    
          setOrder(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    fetchOrder();
  }, []);


  if (loading) {
    return <LoaderComponent/>;
  }

  if (!order) {
    return <LoaderComponent/>;
  }

  return (
    <div className="order-details-container">
      <h1>Order Details</h1>

      <div className="details-card">
        <div className="section">
          <h2>Order Information</h2>

          <p>
            <strong>Order ID :</strong> {order._id}
          </p>

          <p>
            <strong>Placed On :</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <p>
            <strong>Status :</strong>{" "}
            <span
              className={`status ${order.orderStatus.toLowerCase().replace(/\s/g, "-")}`}
            >
              {order.orderStatus}
            </span>
          </p>
        </div>

        <div className="section">
          <h2>Shipping Address</h2>

          <p>{order.shippingAddress.name}</p>

          <p>{order.shippingAddress.address}</p>

          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>

          <p>{order.shippingAddress.zip}</p>
        </div>

        <div className="section">
          <h2>Payment</h2>

          <p>
            <strong>Method :</strong> {order.paymentMethod}
          </p>

          <p>
            <strong>Status :</strong> {order.paymentStatus}
          </p>
        </div>

        <div className="section">
          <h2>Ordered Items</h2>

          {order.items.map((item) => (
            <div className="ordered-item" key={item._id}>
              <img src={item.image} alt={item.title} />

              <div className="item-info">
                <h3>{item.title}</h3>

                <p>Price : ₹{item.price}</p>

                <p>Quantity : {item.quantity}</p>

                <p>Subtotal : ₹{item.subtotal}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{order.subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>-₹{order.discount.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>₹{order.tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{order.shipping.toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>

            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
