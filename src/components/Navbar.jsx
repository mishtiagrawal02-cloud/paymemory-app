import { motion } from "framer-motion";
import { Plus, Wallet, Sparkles } from "lucide-react";

function Navbar({ onAdd }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="nav"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
            <Wallet size={28} />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
            PayMemory
          </h2>
          <p className="text-sm font-semibold text-slate-400">
            AI-Powered Financial Intelligence
          </p>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={onAdd}
        className="relative group overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 group-hover:from-violet-400 group-hover:to-fuchsia-400" />
        <div className="relative flex items-center justify-center gap-2 px-6 py-3 text-sm font-black text-white">
          <Sparkles size={18} className="animate-pulse" />
          Add Transaction
        </div>
      </motion.button>
    </motion.nav>
  );
}

export default Navbar;