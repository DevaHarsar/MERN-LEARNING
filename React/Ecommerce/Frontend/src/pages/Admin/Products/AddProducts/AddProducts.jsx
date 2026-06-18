import "./AddProducts.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function AddProducts() {
    const [categories, setCategories] = useState(null);

    useEffect(()=>{
        const fetchCategories = async () => {
            try{
                const response = await axios.get("https://dummyjson.com/products/category-list");
                setCategories(response.data);
            }
            catch(error){
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, [])

//   const categories = [
//     "Electronics",
//     "Clothing",
//     "Books",
//     "Home & Kitchen",
//     "Sports",
//   ];
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  if(!categories){
    return <div>Loading...</div>
  }
  return (
    <div className="add-products-container">
      <div className="add-category-button">
        <p>Add new products to the inventory.</p>
        <div className="buttons-group">
          <button>Import Products</button>
          <button onClick={() => setShowCategoryModal(true)}>
            Add Category
          </button>
        </div>
      </div>
      <form className="add-product-form">
        <h1>Add Products</h1>
        <label htmlFor="productName">Product Name:</label>
        <input type="text" id="productName" name="productName" required />
        <label htmlFor="productPrice">Product Price:</label>
        <input type="number" id="productPrice" name="productPrice" required />
        <label htmlFor="productImage">Product Image URL:</label>
        <input type="text" id="productImage" name="productImage" required />
        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
          name="productDescription"
          required
        ></textarea>
        <label htmlFor="productCategory">Product Category:</label>
        <select id="productCategory" name="productCategory" required>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="productStock">Product Stock:</label>
        <input type="number" id="productStock" name="productStock" required />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("Add Product");
          }}
        >
          Add Product
        </button>
      </form>
      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="add-category-modal">
            <h2>Add New Category</h2>

            <input type="text" placeholder="Category Name" />

            <div className="modal-buttons">
              <button onClick={() => console.log("Add Category")}>Add</button>

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
