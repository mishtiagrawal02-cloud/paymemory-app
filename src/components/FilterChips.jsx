import { motion } from "framer-motion";

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
        {categories.map((cat, index) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`chip ${activeCategory === cat ? "active" : ""}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="chip-row">
        {statuses.map((status, index) => (
          <motion.button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`chip ${activeStatus === status ? "active" : ""}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 + 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default FilterChips;