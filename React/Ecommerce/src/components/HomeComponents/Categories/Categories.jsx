import "./Categories.css";

function Categories({ category, setCategory }) {
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
  ];

  return (
    <div className="categories">
      {categories.map((cat) => (
        <button key={cat} className="category-btn" onClick={() => setCategory(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Categories;
