import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function DashboardHeader({ score }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <div className="hero-badge">
          <Sparkles size={16} />
          AI-style financial memory dashboard
        </div>

        <h1>Remember every UPI payment with context.</h1>

        <p>
          Track transactions, pending money, scheduled payments, split bills,
          receipts, reminders, insights, and financial score.
        </p>
      </div>

      <FinancialGauge score={score} />
    </section>
  );
}

function FinancialGauge({ score }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 1200;
    const start = performance.now();

    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);

      // Elastic-like ease: f(t) = 1 - (1 - t)^4
      const eased = 1 - Math.pow(1 - progress, 4);

      setDisplayScore(Math.round(eased * score));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [score]);

  const radius = 82;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (displayScore / 100) * circumference;

  return (
    <motion.div
      className="score-gauge-card"
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="gauge-glow" />

      <svg className="score-gauge" viewBox="0 0 220 220">
        <circle
          cx="110"
          cy="110"
          r={radius}
          className="gauge-track"
        />

        <circle
          cx="110"
          cy="110"
          r={radius}
          className="gauge-progress"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>

      <div className="gauge-content">
        <span>Financial Memory Score</span>
        <strong>{displayScore}</strong>
        <small>out of 100</small>
      </div>
    </motion.div>
  );
}

export default DashboardHeader;