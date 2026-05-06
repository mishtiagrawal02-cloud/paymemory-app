import React from "react";
import { motion } from "framer-motion";

function SummaryCard({ title, value, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -6 }}
      className="rounded-[1.7rem] border border-white/10 bg-white/[0.07] p-5 shadow-xl backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-400">{title}</p>
        <div className="rounded-2xl bg-cyan-300/10 p-3 text-cyan-200">
          {React.cloneElement(icon, { size: 22 })}
        </div>
      </div>

      <h3 className="mt-4 text-3xl font-black">{value}</h3>
    </motion.div>
  );
}

export default SummaryCard;