import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

function DashboardHeader({ score = 72, healthStatus = "Good" }) {
  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="hero-copy">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Sparkles size={16} />
          AI-Powered Financial Intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Remember every payment with intelligent context.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Track transactions, pending money, scheduled payments, split bills,
          receipts, reminders, insights, and financial health score.
        </motion.p>

        <motion.div
          className="hero-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="feature-tag">
            <TrendingUp size={14} />
            Smart Analytics
          </div>
          <div className="feature-tag">
            <ShieldCheck size={14} />
            Secure Memory
          </div>
        </motion.div>
      </div>

      <FinancialGauge score={score} />
    </motion.section>
  );
}

function FinancialGauge({ score }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 1500;
    const start = performance.now();

    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayScore(Math.round(eased * score));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (displayScore / 100) * circumference;

  const metrics = [
    { label: "Payment Discipline", value: 80 },
    { label: "Memory Completeness", value: 65 },
    { label: "On-time Payments", value: 70 },
  ];

  return (
    <motion.div
      className="score-gauge-card"
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="gauge-glow"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <svg className="score-gauge" viewBox="0 0 220 220">
        <defs>
          <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>
        </defs>

        <circle cx="110" cy="110" r={radius} className="gauge-track" />

        <motion.circle
          cx="110"
          cy="110"
          r={radius}
          className="gauge-progress"
          stroke="url(#premiumGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      <motion.div
        className="gauge-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span>Financial Health</span>
        <strong>{displayScore}</strong>
        <small>out of 100</small>
        <motion.div
          className="score-label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          {displayScore >= 80 ? "Excellent" : displayScore >= 60 ? "Good" : "Needs Attention"}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default DashboardHeader;