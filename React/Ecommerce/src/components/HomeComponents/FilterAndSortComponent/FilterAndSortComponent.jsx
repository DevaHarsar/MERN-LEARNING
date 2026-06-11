import './FilterAndSortComponent.css';
function FilterAndSortComponent() {
  return (
    <>
      <div className="filter-bar">
        <select>
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Clothing</option>
        </select>

        <select>
          <option>Sort By</option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </>
  );
}

export default FilterAndSortComponent;
