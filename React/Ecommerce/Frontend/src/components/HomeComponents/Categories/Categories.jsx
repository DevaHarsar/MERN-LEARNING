import "./Categories.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Categories({ category, setCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`,
        );

        console.log(response.data);

        setCategories([
          {
            _id: "all",
            name: "All",
          },
          ...response.data,
        ]);
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
          key={cat._id}
          className="category-btn"
          onClick={() =>
            setCategory(cat.name === "All" ? "all" : cat.name.toLowerCase())
          }
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default Categories;
