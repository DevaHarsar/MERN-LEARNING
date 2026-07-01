import Categories from "../../../../components/HomeComponents/Categories/Categories";
import FilterAndSortComponent from "../../../../components/HomeComponents/FilterAndSortComponent/FilterAndSortComponent";
import SearchBar from "../../../../components/HomeComponents/SearchBarComponent/SearchBar";
import ProductList from "../../../Products/ProductList/ProductList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProductPage.css";

function AdminProductPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <Categories category={category} setCategory={setCategory} />
      <FilterAndSortComponent sort={sort} setSort={setSort} />
      <div className="add-product-container">
        <button
          id="add-product-button-admin"
          onClick={() => navigate("/admin/add-products")}
        >
          Add Product
        </button>
      </div>
      <ProductList search={search} category={category} sort={sort} />
    </>
  );
}
export default AdminProductPage;
