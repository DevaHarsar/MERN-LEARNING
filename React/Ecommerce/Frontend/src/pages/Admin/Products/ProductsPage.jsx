import Categories from "../../../components/HomeComponents/Categories/Categories";
import FilterAndSortComponent from "../../../components/HomeComponents/FilterAndSortComponent/FilterAndSortComponent";
import SearchBar from "../../../components/HomeComponents/SearchBarComponent/SearchBar";
import ProductList from "../../Products/ProductList/ProductList";
import { useState } from "react";

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <Categories category={category} setCategory={setCategory} />
      <FilterAndSortComponent sort={sort} setSort={setSort} />
      <ProductList search={search} category={category} sort={sort} />
    </>
  );
}
export default ProductsPage;
