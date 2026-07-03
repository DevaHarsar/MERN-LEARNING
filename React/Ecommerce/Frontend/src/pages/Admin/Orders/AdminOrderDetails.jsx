import "./AdminOrderDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdminOrderById } from "../../../service/orderService";
import "./AdminOrders.css";

function AdminOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await getAdminOrderById(token, id);

        setOrder(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-order-details">
      <h1>Order Details</h1>

      {/* Customer */}

      <div className="details-card">
        <h2>Customer</h2>

        <p>
          <strong>Name :</strong> {order.user?.fullName?.firstName}{" "}
          {order.user?.fullName?.lastName}
        </p>

        <p>
          <strong>Email :</strong> {order.user?.email}
        </p>
         <p>
          <strong>Phone:</strong> {order.shippingAddress.phone}
        </p>
      </div>

      {/* Shipping */}

      <div className="details-card">
        <h2>Shipping Address</h2>

        <p>{order.shippingAddress.name}</p>

        <p>{order.shippingAddress.address}</p>

        <p>
          {order.shippingAddress.city}, {order.shippingAddress.state}
        </p>

        <p>{order.shippingAddress.zip}</p>
      </div>

      {/* Payment */}

      <div className="details-card">
        <h2>Payment</h2>

        <p>
          <strong>Payment Status :</strong>{" "}
          <span
            className={
              order.paymentStatus === "Paid"
                ? "payment-paid"
                : order.paymentStatus === "Pending"
                  ? "payment-pending"
                  : "payment-failed"
            }
          >
            {order.paymentStatus}
          </span>
        </p>
      </div>

      {/* Products */}

      <div className="details-card">
        <h2>Products</h2>

        <table>
          <thead>
            <tr>
              <th>Product</th>

              <th>Price</th>

              <th>Qty</th>

              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>

                <td>₹{item.price}</td>

                <td>{item.quantity}</td>

                <td>₹{item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}

      <div className="details-card">
        <h2>Summary</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{order.subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Discount</span>
          <span>₹{order.discount.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Tax</span>
          <span>₹{order.tax.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>₹{order.shipping.toFixed(2)}</span>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <span>₹{order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetails;
