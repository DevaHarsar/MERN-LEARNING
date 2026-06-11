import ProductCard from "../../../components/ProductCard/ProductCard";
import "./ProductList.css";
function ProductList() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Product 2",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      name: "Product 3",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      name: "Product 3",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      name: "Product 3",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      name: "Product 3",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return (
    <>
      {/* <h1 className="heading-products">Products List</h1> */}
      <div className="product-list">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}

export default ProductList;
