import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

function FinancialHealthGauge({ score = 72 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 1200;
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
    { label: "Payment Discipline", value: 80 },
    { label: "Memory Completeness", value: 65 },
    { label: "On-time Payments", value: 70 },
    { label: "Expense Awareness", value: 75 },
  ];

  return (
    <div className="health-card">
      <h3>Financial Health Score</h3>

      <div className="health-gauge-wrap">
        <svg className="health-gauge" viewBox="0 0 240 240">
          <defs>
            <linearGradient id="amethystGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5D3A9B" />
              <stop offset="60%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <circle
            className="health-track"
            cx="120"
            cy="120"
            r={radius}
          />

          <circle
            className="health-progress"
            cx="120"
            cy="120"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="health-center">
          <strong>{count}</strong>
          <span>out of 100</span>
          <p>Good</p>
        </div>
      </div>

      <div className="health-metrics">
        {metrics.map((metric) => (
          <div className="health-metric" key={metric.label}>
            <div className="metric-row">
              <span>{metric.label}</span>
              <b>{metric.value}/100</b>
            </div>

            <div className="metric-bar">
              <div style={{ width: `${metric.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <button className="insights-button">
        View Full Insights
        <ArrowRight size={17} />
      </button>
    </div>
  );
}

export default FinancialHealthGauge;