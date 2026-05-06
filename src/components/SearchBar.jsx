import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        animate={{
          scale: value ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Search size={18} />
      </motion.div>
      <motion.input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search transactions, tags, notes..."
        className="search-input w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-12 text-sm outline-none placeholder:text-slate-500 focus:border-violet-500/50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileFocus={{
          scale: 1.01,
          borderColor: "rgba(139, 92, 246, 0.5)",
          boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.1)",
        }}
      />
      {value && (
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <Sparkles size={16} className="text-violet-400 animate-pulse" />
        </motion.div>
      )}
    </div>
  );
}

export default SearchBar;