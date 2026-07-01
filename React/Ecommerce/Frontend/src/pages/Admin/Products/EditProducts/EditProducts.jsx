import "./EditProducts.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
        );

        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`,
        );
        setCategories(response.data);
        console.log("Fetched categories:", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setSelectedImage(files[0]);
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("discountPercentage", product.discountPercentage);
      formData.append("stock", product.stock);
      formData.append("brand", product.brand);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Product Updated Successfully");

      navigate("/admin/products");
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
          onWheel={(e) => e.target.blur()}
          required
        />

        <label>Discount %</label>
        <input
          type="number"
          name="discountPercentage"
          value={product.discountPercentage}
          onChange={handleChange}
          onWheel={(e) => e.target.blur()}
        />

        <label>Product Image</label>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : product.thumbnail
          }
          alt="Preview"
          width="150"
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
            <option key={category._id} value={category.name.toLowerCase()}>
              {category.name}
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
          onWheel={(e) => e.target.blur()}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProducts;
