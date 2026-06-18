import "./Categories.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Categories({ category, setCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/category-list",
        );

        console.log(response.data);

        setCategories(["All", ...response.data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // const categories = [
  //   "All",
  //   "Electronics",
  //   "Clothing",
  //   "Home & Kitchen",
  //   "Books",
  // ];

  return (
    <div className="categories">
      {categories.map((cat) => (
        <button
          key={cat}
          className="category-btn"
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Categories;
