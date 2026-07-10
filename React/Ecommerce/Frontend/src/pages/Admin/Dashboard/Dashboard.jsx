import DashboardCard from "./DashboardCard";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../../../service/dashboardService";
function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await getDashboard(token);

        setDashboardData(response.data);
        console.log("Dashboard Data:", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-container">
        <DashboardCard title="Users" value={dashboardData?.totalUsers ?? 0} />

        <DashboardCard
          title="Products"
          value={dashboardData?.totalProducts ?? 0}
        />

        <DashboardCard title="Orders" value={dashboardData?.totalOrders ?? 0} />

        <DashboardCard
          title="Paid Revenue"
          value={`₹${Number(dashboardData?.paidRevenue ?? 0).toLocaleString(
            "en-IN",
          )}`}
        />

        <DashboardCard
          title="Pending Payments"
          value={`₹${Number(dashboardData?.pendingRevenue ?? 0).toLocaleString(
            "en-IN",
          )}`}
        />

        <DashboardCard
          title="Total Order Value"
          value={`₹${Number(dashboardData?.totalOrderValue ?? 0).toLocaleString(
            "en-IN",
          )}`}
        />

        <DashboardCard
          title="Pending Orders"
          value={dashboardData?.pendingOrders ?? 0}
        />

        <DashboardCard
          title="Packed Orders"
          value={dashboardData?.packedOrders ?? 0}
        />

        <DashboardCard
          title="Shipped Orders"
          value={dashboardData?.shippedOrders ?? 0}
        />

        <DashboardCard
          title="Delivered Orders"
          value={dashboardData?.deliveredOrders ?? 0}
        />

        <DashboardCard
          title="Cancelled Orders"
          value={dashboardData?.cancelledOrders ?? 0}
        />

        <DashboardCard
          title="Low Stock"
          value={dashboardData?.lowStockCount ?? 0}
        />

        <DashboardCard
          title="Out of Stock"
          value={dashboardData?.outOfStockProducts ?? 0}
        />
      </div>
      <h1 className="dashboard-title">Quick Actions</h1>
      <div className="quick-actions">
        <div
          className="action-card"
          onClick={() => navigate("/admin/add-products")}
        >
          <h4>Add Product</h4>
          <p>Create a new product</p>
        </div>

        <div
          className="action-card"
          onClick={() => navigate("/admin/products")}
        >
          <h4>Products</h4>
          <p>Manage products</p>
        </div>

        <div className="action-card" onClick={() => navigate("/admin/orders")}>
          <h4>Orders</h4>
          <p>Manage customer orders</p>
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order</th>

              <th>Customer</th>

              <th>Status</th>

              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {dashboardData?.recentOrders?.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6)}</td>

                <td>{order.user.fullName.firstName}</td>

                <td>
                  <span
                    className={`status ${order.orderStatus.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td>₹{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dashboard-bottom">
        <div className="dashboard-section">
          <h2>Low Stock Products</h2>

          <div className="list-card">
            {dashboardData?.lowStockProducts?.map((product) => (
              <div className="list-item" key={product._id}>
                <div>
                  <h4>{product.title}</h4>
                </div>

                <span className="stock-count">Stock: {product.stock}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Latest Users</h2>

          <div className="list-card">
            {dashboardData?.latestUsers?.map((user) => (
              <div className="list-item" key={user._id}>
                <div>
                  <h4>{user.fullName.firstName}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
