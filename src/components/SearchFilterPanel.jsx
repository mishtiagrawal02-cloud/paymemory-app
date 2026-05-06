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
}) {
  return (
    <div className="search-filter-card">
      <SearchBar value={search} onChange={setSearch} />

      <FilterChips
        categories={categories}
        statuses={statuses}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />
    </div>
  );
}

export default SearchFilterPanel;