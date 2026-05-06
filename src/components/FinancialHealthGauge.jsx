import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, ShieldCheck, Clock } from "lucide-react";

function FinancialHealthGauge({ score = 72 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 1500;
    const start = performance.now();

    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * score));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / 100) * circumference;

  const metrics = [
    { label: "Payment Discipline", value: 80, icon: <TrendingUp size={14} /> },
    { label: "Memory Completeness", value: 65, icon: <ShieldCheck size={14} /> },
    { label: "On-time Payments", value: 70, icon: <Clock size={14} /> },
    { label: "Expense Awareness", value: 75, icon: <TrendingUp size={14} /> },
  ];

  return (
    <motion.div
      className="health-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3>Financial Health Score</h3>

      <div className="health-gauge-wrap">
        <motion.svg
          className="health-gauge"
          viewBox="0 0 240 240"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <defs>
            <linearGradient id="amethystGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="60%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#C4B5FD" />
            </linearGradient>
          </defs>

          <circle
            className="health-track"
            cx="120"
            cy="120"
            r={radius}
          />

          <motion.circle
            className="health-progress"
            cx="120"
            cy="120"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.svg>

        <motion.div
          className="health-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <strong>{count}</strong>
          <span>out of 100</span>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {count >= 80 ? "Excellent" : count >= 60 ? "Good" : "Needs Attention"}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="health-metrics"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {metrics.map((metric, index) => (
          <motion.div
            className="health-metric"
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
          >
            <div className="metric-row">
              <span>{metric.label}</span>
              <b>{metric.value}/100</b>
            </div>

            <div className="metric-bar">
              <motion.div
                style={{ width: `${metric.value}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="insights-button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Full Insights
        <ArrowRight size={17} />
      </motion.button>
    </motion.div>
  );
}

export default FinancialHealthGauge;