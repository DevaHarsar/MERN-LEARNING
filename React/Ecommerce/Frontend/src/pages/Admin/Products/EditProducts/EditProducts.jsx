import "./EditProducts.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = [
    "smartphones",
    "laptops",
    "headphones",
    "smartwatches",
    "footwear",
    "mens-clothing",
    "womens-clothing",
    "gaming",
    "televisions",
    "kitchen",
    "furniture",
  ];

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
        discountPercentage: Number(product.discountPercentage),
        images: [product.thumbnail],
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        updatedProduct
      );

      console.log(response.data);

      alert("Product Updated Successfully");

      navigate("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="edit-product-container">
      <form className="edit-product-form" onSubmit={handleSubmit}>
        <h1>Edit Product</h1>

        <label>Product Name</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />

        <label>Brand</label>
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Discount %</label>
        <input
          type="number"
          name="discountPercentage"
          value={product.discountPercentage}
          onChange={handleChange}
        />

        <label>Image URL</label>
        <input
          type="text"
          name="thumbnail"
          value={product.thumbnail}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProducts;