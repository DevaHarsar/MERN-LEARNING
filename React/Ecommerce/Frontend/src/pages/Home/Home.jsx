import ProductList from "../../pages/Products/ProductList/ProductList";
import "./Home.css";
import SearchBar from "../../components/HomeComponents/SearchBarComponent/SearchBar";
import HeroBanner from "../../components/HomeComponents/HeroBanner/HeroBanner";
import Categories from "../../components/HomeComponents/Categories/Categories";
import FilterAndSortComponent from "../../components/HomeComponents/FilterAndSortComponent/FilterAndSortComponent";
import { useEffect, useState } from "react";
function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeroBanner />
      <SearchBar search={search} setSearch={setSearch} />
      <Categories category={category} setCategory={setCategory} />
      <FilterAndSortComponent sort={sort} setSort={setSort} />
      <ProductList search={search} category={category} sort={sort} />
    </>
  );
}

export default Home;
