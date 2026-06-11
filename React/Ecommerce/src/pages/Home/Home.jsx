import ProductList from "../../pages/Products/ProductList/ProductList";
import "./Home.css";
import SearchBar from "../../components/HomeComponents/SearchBarComponent/SearchBar";
import HeroBanner from "../../components/HomeComponents/HeroBanner/HeroBanner";
import Categories from "../../components/HomeComponents/Categories/Categories";
import FilterAndSortComponent from "../../components/HomeComponents/FilterAndSortComponent/FilterAndSortComponent";
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeroBanner />
      <SearchBar />
      <Categories />
      <FilterAndSortComponent />
      <ProductList />
    </>
  );
}

export default Home;
