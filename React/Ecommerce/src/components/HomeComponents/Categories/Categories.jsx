import "./Categories.css";

function Categories() {
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
  ];

  return (
    <div className="categories">
      {categories.map((category) => (
        <button key={category} className="category-btn">
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;
