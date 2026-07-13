import "./AdminOrders.css";
import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../../service/orderService";
import SearchBar from "../../../components/HomeComponents/SearchBarComponent/SearchBar";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../../components/LoaderComponent/LoaderComponent";
import { toast } from "react-toastify";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(token);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateOrderStatus(token, id, status);

      const updatedOrder = response.data;

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? updatedOrder : order)),
      );

      toast.success("Order updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error updating order");
    }
  };

  let filteredOrders = [...orders];

  if (search.trim() !== "") {
    filteredOrders = filteredOrders.filter((order) => {
      const fullName = `${order.user?.fullName?.firstName || ""} ${
        order.user?.fullName?.lastName || ""
      }`.toLowerCase();

      return (
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        fullName.includes(search.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  if (loading) {
    return <LoaderComponent/>;
  }

  return (
    <div className="admin-orders">
      <h1>Manage Orders</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Total</th>
            <th>Update</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-8).toUpperCase()}</td>
                <td>
                  <div className="customer-name">
                    {order.user?.fullName?.firstName}{" "}
                    {order.user?.fullName?.lastName}
                  </div>

                  <span className="customer-email">{order.user?.email}</span>
                </td>

                <td>
                  <p>{order.paymentMethod}</p>

                  <span
                    className={
                      order.paymentStatus === "Paid" ? "paid" : "pending"
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                <td>
                  <span
                    className={`status ${order.orderStatus
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td>₹{Number(order.total).toLocaleString("en-IN")}</td>

                <td>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Placed">Placed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
