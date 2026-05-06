import { motion } from "framer-motion";
import { ArrowUpDown, X } from "lucide-react";
import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";

function SearchFilterPanel({
  search,
  setSearch,
  categories,
  statuses,
  activeCategory,
  setActiveCategory,
  activeStatus,
  setActiveStatus,
  sortBy,
  setSortBy,
  onResetFilters,
}) {
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "highest", label: "Highest Amount" },
    { value: "lowest", label: "Lowest Amount" },
    { value: "overdue", label: "Overdue First" },
  ];

  const hasActiveFilters = search || activeCategory !== "All" || activeStatus !== "All" || sortBy !== "newest";

  return (
    <motion.div
      className="search-filter-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SearchBar value={search} onChange={setSearch} />

      <FilterChips
        categories={categories}
        statuses={statuses}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />

      <div className="sort-section">
        <div className="sort-header">
          <span className="sort-label">
            <ArrowUpDown size={14} />
            Sort By
          </span>
          {hasActiveFilters && (
            <button className="reset-filters-button" onClick={onResetFilters}>
              <X size={14} />
              Reset
            </button>
          )}
        </div>
        <div className="sort-options">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`sort-option ${sortBy === option.value ? "active" : ""}`}
              onClick={() => setSortBy(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default SearchFilterPanel;