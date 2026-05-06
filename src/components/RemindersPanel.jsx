import { motion } from "framer-motion";
import {
  Bell,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  CalendarDays,
  Zap,
  BellOff,
} from "lucide-react";
import { formatMoney } from "../utils/helpers";

function getDaysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function getPriorityConfig(priority) {
  switch (priority) {
    case "critical":
      return { color: "#f87171", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", label: "Critical" };
    case "high":
      return { color: "#fb923c", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)", label: "High" };
    case "medium":
      return { color: "#fbbf24", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", label: "Medium" };
    default:
      return { color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)", label: "Low" };
  }
}

function ReminderItem({ transaction, onSelect, onMarkPaid, onSnooze }) {
  const days = getDaysUntil(transaction.scheduledDate || transaction.dueDate);
  const priority = getPriorityConfig(transaction.priority);
  const isOverdue = days !== null && days < 0;
  const isDueToday = days === 0;
  const isDueSoon = days !== null && days > 0 && days <= 3;

  let countdownLabel = "";
  let countdownColor = "#94a3b8";

  if (days === null) {
    countdownLabel = "No due date";
  } else if (isOverdue) {
    countdownLabel = `${Math.abs(days)}d overdue`;
    countdownColor = "#f87171";
  } else if (isDueToday) {
    countdownLabel = "Due today";
    countdownColor = "#fb923c";
  } else if (isDueSoon) {
    countdownLabel = `Due in ${days}d`;
    countdownColor = "#fbbf24";
  } else {
    countdownLabel = `Due in ${days}d`;
    countdownColor = "#94a3b8";
  }

  const paidAmount = transaction.paidAmount ?? (transaction.amount - (transaction.pendingAmount ?? 0));
  const totalAmount = transaction.totalAmount ?? transaction.amount;
  const progress = totalAmount > 0 ? Math.min(100, Math.round((paidAmount / totalAmount) * 100)) : 0;

  return (
    <motion.div
      className="reminder-item"
      style={{ borderColor: isOverdue ? "rgba(239,68,68,0.3)" : isDueToday ? "rgba(249,115,22,0.3)" : "var(--stroke)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="reminder-priority-stripe" style={{ background: priority.color }} />

      <div className="reminder-item-body">
        <div className="reminder-item-top">
          <div className="reminder-item-info">
            <div className="reminder-item-name-row">
              <span className="reminder-item-name">{transaction.name}</span>
              <span
                className="reminder-priority-badge"
                style={{ color: priority.color, background: priority.bg, borderColor: priority.border }}
              >
                {priority.label}
              </span>
            </div>
            <span className="reminder-item-note">{transaction.reminder || transaction.note}</span>
          </div>

          <div className="reminder-item-right">
            <span className="reminder-amount">{formatMoney(transaction.pendingAmount ?? transaction.amount)}</span>
            <span className="reminder-countdown" style={{ color: countdownColor }}>
              {isOverdue && <AlertTriangle size={11} />}
              {isDueToday && <Zap size={11} />}
              {!isOverdue && !isDueToday && <Clock size={11} />}
              {countdownLabel}
            </span>
          </div>
        </div>

        {(transaction.pendingAmount > 0 || paidAmount > 0) && totalAmount > 0 && (
          <div className="reminder-progress-wrap">
            <div className="reminder-progress-bar">
              <motion.div
                className="reminder-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  background: progress === 100
                    ? "linear-gradient(90deg, #10b981, #34d399)"
                    : "linear-gradient(90deg, #8b5cf6, #a78bfa)",
                }}
              />
            </div>
            <span className="reminder-progress-label">
              {formatMoney(paidAmount)} of {formatMoney(totalAmount)} paid ({progress}%)
            </span>
          </div>
        )}

        <div className="reminder-item-actions">
          <motion.button
            className="reminder-action-btn reminder-action-paid"
            onClick={() => onMarkPaid(transaction)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <CheckCircle2 size={13} />
            Mark Paid
          </motion.button>

          <motion.button
            className="reminder-action-btn reminder-action-snooze"
            onClick={() => onSnooze(transaction)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <BellOff size={13} />
            Snooze
          </motion.button>

          <motion.button
            className="reminder-action-btn reminder-action-view"
            onClick={() => onSelect(transaction.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            View
            <ChevronRight size={13} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function RemindersPanel({ transactions, onSelectTransaction, onUpdateTransaction }) {
  const withReminders = transactions.filter(
    (t) => t.reminder || t.status === "pending" || t.status === "overdue" || t.status === "follow-up"
  );

  const overdue = withReminders.filter((t) => {
    const days = getDaysUntil(t.scheduledDate || t.dueDate);
    return t.status === "overdue" || (days !== null && days < 0);
  });

  const dueToday = withReminders.filter((t) => {
    const days = getDaysUntil(t.scheduledDate || t.dueDate);
    return days === 0;
  });

  const upcoming = withReminders.filter((t) => {
    const days = getDaysUntil(t.scheduledDate || t.dueDate);
    return days !== null && days > 0 && t.status !== "settled";
  }).sort((a, b) => {
    const da = getDaysUntil(a.scheduledDate || a.dueDate);
    const db = getDaysUntil(b.scheduledDate || b.dueDate);
    return da - db;
  });

  const general = withReminders.filter((t) => {
    const days = getDaysUntil(t.scheduledDate || t.dueDate);
    return days === null && t.reminder && t.status !== "settled";
  });

  function handleMarkPaid(transaction) {
    onUpdateTransaction({
      ...transaction,
      status: "settled",
      paidAmount: transaction.totalAmount ?? transaction.amount,
      pendingAmount: 0,
      timeline: [...(transaction.timeline || []), "Marked as paid"],
    });
  }

  function handleSnooze(transaction) {
    const current = new Date(transaction.scheduledDate || new Date());
    current.setDate(current.getDate() + 3);
    const newDate = current.toISOString().split("T")[0];
    onUpdateTransaction({
      ...transaction,
      scheduledDate: newDate,
      timeline: [...(transaction.timeline || []), "Reminder snoozed by 3 days"],
    });
  }

  const totalPending = withReminders
    .filter((t) => t.status !== "settled")
    .reduce((sum, t) => sum + (t.pendingAmount ?? t.amount), 0);

  if (withReminders.length === 0) {
    return (
      <motion.div
        className="reminders-panel"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="reminders-panel-header">
          <div className="reminders-panel-title">
            <Bell size={20} />
            <h2>Reminders</h2>
          </div>
        </div>
        <div className="reminders-empty">
          <Bell size={40} strokeWidth={1.5} />
          <p>No active reminders</p>
          <small>Add reminders to transactions to see them here</small>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="reminders-panel"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
    >
      <div className="reminders-panel-header">
        <div className="reminders-panel-title">
          <Bell size={20} />
          <h2>Reminders</h2>
        </div>
        <div className="reminders-panel-meta">
          <span className="reminders-count-badge">{withReminders.filter(t => t.status !== "settled").length} active</span>
        </div>
      </div>

      <div className="reminders-summary-strip">
        <div className="reminders-strip-item">
          <span className="strip-value" style={{ color: "#f87171" }}>{overdue.length}</span>
          <span className="strip-label">Overdue</span>
        </div>
        <div className="reminders-strip-divider" />
        <div className="reminders-strip-item">
          <span className="strip-value" style={{ color: "#fb923c" }}>{dueToday.length}</span>
          <span className="strip-label">Due Today</span>
        </div>
        <div className="reminders-strip-divider" />
        <div className="reminders-strip-item">
          <span className="strip-value" style={{ color: "#a78bfa" }}>{upcoming.length}</span>
          <span className="strip-label">Upcoming</span>
        </div>
        <div className="reminders-strip-divider" />
        <div className="reminders-strip-item">
          <span className="strip-value" style={{ color: "#fbbf24" }}>₹{Number(totalPending).toLocaleString("en-IN")}</span>
          <span className="strip-label">Pending</span>
        </div>
      </div>

      <div className="reminders-list">
        {overdue.length > 0 && (
          <ReminderGroup
            title="Overdue"
            icon={<AlertTriangle size={14} />}
            color="#f87171"
            items={overdue}
            onSelect={onSelectTransaction}
            onMarkPaid={handleMarkPaid}
            onSnooze={handleSnooze}
          />
        )}

        {dueToday.length > 0 && (
          <ReminderGroup
            title="Due Today"
            icon={<Zap size={14} />}
            color="#fb923c"
            items={dueToday}
            onSelect={onSelectTransaction}
            onMarkPaid={handleMarkPaid}
            onSnooze={handleSnooze}
          />
        )}

        {upcoming.length > 0 && (
          <ReminderGroup
            title="Upcoming"
            icon={<CalendarDays size={14} />}
            color="#a78bfa"
            items={upcoming}
            onSelect={onSelectTransaction}
            onMarkPaid={handleMarkPaid}
            onSnooze={handleSnooze}
          />
        )}

        {general.length > 0 && (
          <ReminderGroup
            title="Reminders"
            icon={<Bell size={14} />}
            color="#94a3b8"
            items={general}
            onSelect={onSelectTransaction}
            onMarkPaid={handleMarkPaid}
            onSnooze={handleSnooze}
          />
        )}
      </div>
    </motion.div>
  );
}

function ReminderGroup({ title, icon, color, items, onSelect, onMarkPaid, onSnooze }) {
  return (
    <div className="reminder-group">
      <div className="reminder-group-header" style={{ color }}>
        {icon}
        <span>{title}</span>
        <span className="reminder-group-count">{items.length}</span>
      </div>
      {items.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <ReminderItem
            transaction={t}
            onSelect={onSelect}
            onMarkPaid={onMarkPaid}
            onSnooze={onSnooze}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default RemindersPanel;
