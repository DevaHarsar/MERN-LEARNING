import "./AddProducts.css";
import { useState } from "react";
import axios from "axios";

function AddProducts() {
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

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: categories[0],
    price: "",
    discountPercentage: 0,
    stock: "",
    brand: "",
    thumbnail: "",
  });

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
      const productData = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
        discountPercentage: Number(product.discountPercentage),
        rating: 0,
        images: [product.thumbnail],
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        productData,
      );

      console.log(response.data);

      alert("Product Added Successfully");

      setProduct({
        title: "",
        description: "",
        category: categories[0],
        price: "",
        discountPercentage: 0,
        stock: "",
        brand: "",
        thumbnail: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
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
          required
        />

        <label>Discount %</label>
        <input
          type="number"
          name="discountPercentage"
          value={product.discountPercentage}
          onChange={handleChange}
        />

        <label>Thumbnail URL</label>
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

        <button type="submit">Add Product</button>
      </form>

      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="add-category-modal">
            <h2>Add New Category</h2>

            <input type="text" placeholder="Category Name" />

            <div className="modal-buttons">
              <button>Add</button>

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
