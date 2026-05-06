function FilterChips({
  categories,
  statuses,
  activeCategory,
  setActiveCategory,
  activeStatus,
  setActiveStatus,
}) {
  return (
    <div className="filter-area">
      <div className="chip-row">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`chip ${activeCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="chip-row">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`chip ${activeStatus === status ? "active" : ""}`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterChips;