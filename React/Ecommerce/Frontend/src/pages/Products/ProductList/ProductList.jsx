import ProductCard from "../../../components/ProductCard/ProductCard";
import "./ProductList.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import LoaderComponent from "../../../components/LoaderComponent/loaderComponent";
import { toast } from "react-toastify";

function ProductList({ search, category, sort }) {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const role = user?.role;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`,
          {
            params: {
              q: search,
              category: category === "all" ? "" : category,
              sort:
                sort === "low"
                  ? "price_asc"
                  : sort === "high"
                  ? "price_desc"
                  : sort === "newest"
                  ? "newest"
                  : "",
              page: currentPage,
              limit: 8,
            },
          }
        );

        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, sort, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  const handleDeleteProduct = (deletedId) => {
    setProducts((prev) =>
      prev.filter((product) => product._id !== deletedId)
    );
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <>
      {products.length === 0 ? (
        <h2>No Products Found</h2>
      ) : (
        <>
          <div className="product-list">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                role={role}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ProductList;