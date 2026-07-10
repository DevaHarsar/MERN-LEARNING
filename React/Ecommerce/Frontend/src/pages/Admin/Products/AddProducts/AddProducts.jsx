import "./AddProducts.css";
import { useState, useEffect } from "react";
import api from "../../../../api.js"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProducts() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const navigate = useNavigate();

  useEffect(
    () => {
      const fetchCategories = async () => {
        try {
          const response = await api.get(
            `${import.meta.env.VITE_API_URL}/categories`,
          );
          setCategories(response.data);
          console.log("Fetched categories:", response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
    },
    [],
    categories,
  );

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: 0,
    stock: "",
    brand: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setProduct((prev) => ({
        ...prev,
        image: files[0],
      }));
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

      formData.append("image", product.image);


      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/products`,
        formData,
      );

      console.log(response.data);

      toast.success("Product added successfully");
      navigate("/admin/products");

      setProduct({
        title: "",
        description: "",
        category: "",
        price: "",
        discountPercentage: 0,
        stock: "",
        brand: "",
        image: null,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  const addCategory = async (name) => {
    if (!name.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/categories`,
        {
          name: name.trim(),
        },
      );

      setCategories((prev) => [...prev, response.data]);

      setProduct((prev) => ({
        ...prev,
        category: response.data.name.toLowerCase(),
      }));

      setNewCategoryName("");
      setShowCategoryModal(false);

      toast.success("Category added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };
  return (
    <div className="add-products-container">
      <div className="add-category-button">
        <p>Add new products to the inventory.</p>

        <div className="buttons-group">
          <button type="button">Import Products</button>

          <button type="button" onClick={() => setShowCategoryModal(true)}>
            Add Category
          </button>
        </div>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <h1>Add Product</h1>

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

        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange}
          required
        />
        {product.image && (
          <div className="image-preview-container">
            <img
              src={URL.createObjectURL(product.image)}
              alt="Preview"
              className="image-preview"
            />

            <button
              type="button"
              className="remove-image-btn"
              onClick={() =>
                setProduct((prev) => ({
                  ...prev,
                  image: null,
                }))
              }
            >
              ×
            </button>
          </div>
        )}

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
          required
        >
          <option value="">Select a category</option>
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
          onWheel={(e) => e.target.blur()}
          required
        />

        <button type="submit">Add Product</button>
      </form>

      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="add-category-modal">
            <h2>Add New Category</h2>

            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={() => addCategory(newCategoryName)}>Add</button>

              <button onClick={() => setShowCategoryModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProducts;
