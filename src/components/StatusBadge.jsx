import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";

function StatusBadge({ status }) {
  const config = {
    settled: {
      icon: <CheckCircle2 size={14} />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    pending: {
      icon: <Clock3 size={14} />,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
    "follow-up": {
      icon: <AlertCircle size={14} />,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
    },
    overdue: {
      icon: <AlertCircle size={14} />,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
    },
  };

  const item = config[status] || config.pending;

  return (
    <motion.span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black capitalize border ${item.color} ${item.bg} ${item.border}`}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {item.icon}
      {status}
    </motion.span>
  );
}

export default StatusBadge;