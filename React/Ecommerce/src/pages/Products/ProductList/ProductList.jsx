import ProductCard from "../../../components/ProductCard/ProductCard";
import "./ProductList.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
function ProductList({search, category, sort}) {
  const { user } = useContext(AuthContext);
  console.log("User in ProductList:", user);

  const role = user?.role;
  console.log("Role in ProductList:", role);

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Electronics",
      createdAt: "2023-10-01T12:00:00Z",
    },
    {
      id: 2,
      name: "Product 2",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Electronics",
      createdAt: "2023-10-02T15:30:00Z",
    },
    {
      id: 3,
      name: "Product 3",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Clothing",
      createdAt: "2023-10-03T10:45:00Z",
    },
    {
      id: 4,
      name: "Product 3",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Home & Kitchen",
      createdAt: "2023-10-04T09:20:00Z",
    },
    {
      id: 5,
      name: "Product 3",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Books",
      createdAt: "2023-10-05T14:10:00Z",
    },
    {
      id: 6,
      name: "Product 3",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Electronics",
      createdAt: "2023-10-06T11:30:00Z",
    },
  ];
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts=[...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if(sort === "newest") {
    filteredProducts=[...filteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return (
    <>
      {/* <h1 className="heading-products">Products List</h1> */}
      <div className="product-list">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} role={role} />;
        })}
      </div>
    </>
  );
}

export default ProductList;
