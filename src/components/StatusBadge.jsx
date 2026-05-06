import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";

function StatusBadge({ status }) {
  const config = {
    settled: {
      icon: <CheckCircle2 size={14} />,
      color: "text-emerald-300",
    },
    pending: {
      icon: <Clock3 size={14} />,
      color: "text-amber-300",
    },
    "follow-up": {
      icon: <AlertCircle size={14} />,
      color: "text-rose-300",
    },
    overdue: {
      icon: <AlertCircle size={14} />,
      color: "text-red-300",
    },
  };

  const item = config[status] || config.pending;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-black capitalize ${item.color}`}
    >
      {item.icon}
      {status}
    </span>
  );
}

export default StatusBadge;