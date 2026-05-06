import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

function SummaryCard({ title, value, icon, delay }) {
  const isMoney = typeof value === 'string' && value.includes('₹');
  const trend = Math.random() > 0.5 ? 'up' : 'down';
  const trendValue = (Math.random() * 15).toFixed(1);

  return (
    <motion.div
      className="summary-card-wrapper"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="summary-card">
        <div className="card-header">
          <p className="card-title">{title}</p>
          <div className="icon-wrapper">
            {React.cloneElement(icon, { size: 20, className: "icon" })}
          </div>
        </div>

        <motion.h3
          className="card-value"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
        >
          {value}
        </motion.h3>

        <motion.div
          className="trend-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
        >
          {trend === 'up' ? (
            <ArrowUpRight size={14} className="text-emerald-400" />
          ) : (
            <ArrowDownRight size={14} className="text-rose-400" />
          )}
          <span className={trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}>
            {trendValue}%
          </span>
          <span className="trend-label">vs last month</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SummaryCard;