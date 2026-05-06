import { motion } from "framer-motion";
import { Plus, Wallet } from "lucide-react";

function Navbar({ onAdd }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
          <Wallet size={26} />
        </div>
        <div>
          <h2 className="text-2xl font-black">PayMemory</h2>
          <p className="text-sm text-slate-400">
            Financial memory layer for UPI
          </p>
        </div>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 hover:bg-cyan-200"
      >
        <Plus size={18} />
        Add Mock Transaction
      </button>
    </motion.nav>
  );
}

export default Navbar;