import './FilterAndSortComponent.css';
function FilterAndSortComponent({ sort, setSort }) {
  return (
    <>
      <div className="filter-bar">

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </>
  );
}

export default FilterAndSortComponent;
