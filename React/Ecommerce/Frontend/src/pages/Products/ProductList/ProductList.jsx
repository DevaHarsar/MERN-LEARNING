import ProductCard from "../../../components/ProductCard/ProductCard";
import "./ProductList.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
function ProductList({ search, category, sort }) {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  console.log("User in ProductList:", user);

  const role = user?.role;
  console.log("Role in ProductList:", role);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`,
        );
        console.log(response.data.products);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = (deletedId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== deletedId),
    );
  };

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (sort === "newest") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }
  return (
    <>
      {/* <h1 className="heading-products">Products List</h1> */}
      <div className="product-list">
        {filteredProducts.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              role={role}
              onDelete={handleDeleteProduct}
            />
          );
        })}
      </div>
    </>
  );
}

export default ProductList;
