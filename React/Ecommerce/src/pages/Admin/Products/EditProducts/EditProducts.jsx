import { useParams } from "react-router-dom";
import "./EditProducts.css";
import { useEffect, useState } from "react";
import axios from "axios";
function EditProducts() {
  const [product, setProducts] = useState(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchedProducts();
  }, [id]);

  // const product = {
  //   id: params.id,
  //   name: `Product ${params.id}`,
  //   price: 29.99,
  //   image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   stock: 10,
  // };
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="edit-product-container">
      <form className="edit-product-form">
        <h1>Edit Product</h1>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          defaultValue={product.title}
          required
        />
        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          defaultValue={product.price}
          required
        />
        <label htmlFor="productImage">Product Image URL:</label>
        <input
          type="text"
          id="productImage"
          name="productImage"
          defaultValue={product.images[0]}
          required
        />
        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
          name="productDescription"
          defaultValue={product.description}
          required
        ></textarea>
        <label htmlFor="stock">Product Stock:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          defaultValue={product.stock}
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProducts;
