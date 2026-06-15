import DashboardCard from "./DashboardCard";
import "./Dashboard.css";
import SearchBar from "../../../components/HomeComponents/SearchBarComponent/SearchBar";
import Categories from "../../../components/HomeComponents/Categories/Categories";
import FilterAndSortComponent from "../../../components/HomeComponents/FilterAndSortComponent/FilterAndSortComponent";
import ProductList from "../../Products/ProductList/ProductList";
import { useState } from "react";
function Dashboard() {
  const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("");
  const dashboardData = [
    {
      title: "Total Users",
      value: 1000,
    },
    {
      title: "Total Orders",
      value: 500,
    },
    {
      title: "Total Revenue",
      value: "$100,000",
    },
    {
      title: "Total Products",
      value: 200,
    },
    {
      title: "Total Categories",
      value: 20,
    },
    {
      title: "Total Reviews",
      value: 1500,
    },
    {
      title: "Total Stock",
      value: 5000,
    },
    {
      title: "Total Sales",
      value: 300,
    }
  ];

  return (
    <>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-container">
        {dashboardData.map((data, index) => (
          <DashboardCard key={index} title={data.title} value={data.value} />
        ))}
      </div>
      <div className="add-product-section">
        <SearchBar search={search} setSearch={setSearch} />
        <Categories category={category} setCategory={setCategory} />
        <FilterAndSortComponent sort={sort} setSort={setSort} />
        <button id="add-product-button">Add products</button>
      </div>
      <ProductList search={search} category={category} sort={sort} />
    </>
  );
}
export default Dashboard;
