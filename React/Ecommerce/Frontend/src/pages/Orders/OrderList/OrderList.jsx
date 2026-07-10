import "./OrderList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../../../service/orderService";
import LoaderComponent from "../../../components/LoaderComponent/loaderComponent";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem("token");
    
          const response = await getMyOrders(token);
    
          setOrders(response.data);
        } catch (error) {
          console.error("Error loading orders", error);
        } finally {
          setLoading(false);
        }
      };
    fetchOrders();
  }, []);


  if (loading) {
    return <LoaderComponent/>;
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <h2>No Orders Found</h2>
        <p>You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <div>
              <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>

              <p>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className={`status ${order.orderStatus.toLowerCase().replace(/\s/g, "-")}`}>
              {order.orderStatus}
            </div>
          </div>

          <div className="order-products">
            {order.items.slice(0, 2).map((item) => (
              <div className="product-preview" key={item._id}>
                <img src={item.image} alt={item.title} />

                <div>
                  <h4>{item.title}</h4>

                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            {order.items.length > 2 && (
              <p className="more-items">
                + {order.items.length - 2} more items
              </p>
            )}
          </div>

          <div className="order-footer">
            <h3>₹{order.total.toFixed(2)}</h3>

            <button
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;