import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

function EmptyState({ onClearFilters }) {
  return (
    <motion.div
      className="empty-state-wrapper"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="empty-state">
        <motion.div
          className="empty-icon"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Search size={48} className="text-violet-400" />
        </motion.div>
        <h3 className="empty-title">No transactions found</h3>
        <p className="empty-description">
          Try adjusting your search or filters to find what you're looking for.
        </p>
        <motion.button
          className="empty-cta"
          onClick={onClearFilters}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles size={16} />
          Clear Filters
        </motion.button>
      </div>
    </motion.div>
  );
}

export default EmptyState;