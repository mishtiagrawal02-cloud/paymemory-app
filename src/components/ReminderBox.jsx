import { motion } from "framer-motion";
import { Bell, Clock, CalendarDays, AlertTriangle, Zap } from "lucide-react";

function getDaysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function ReminderBox({ value, setValue, scheduledDate }) {
  const days = getDaysUntil(scheduledDate);

  let countdownEl = null;
  if (days !== null) {
    if (days < 0) {
      countdownEl = (
        <div className="reminder-countdown-badge overdue">
          <AlertTriangle size={12} />
          {Math.abs(days)} day{Math.abs(days) !== 1 ? "s" : ""} overdue
        </div>
      );
    } else if (days === 0) {
      countdownEl = (
        <div className="reminder-countdown-badge today">
          <Zap size={12} />
          Due today
        </div>
      );
    } else if (days <= 3) {
      countdownEl = (
        <div className="reminder-countdown-badge soon">
          <Clock size={12} />
          Due in {days} day{days !== 1 ? "s" : ""}
        </div>
      );
    } else {
      countdownEl = (
        <div className="reminder-countdown-badge upcoming">
          <CalendarDays size={12} />
          Due in {days} days
        </div>
      );
    }
  }

  return (
    <div className="reminder-box">
      <div className="reminder-box-header">
        <label className="section-label">
          <Bell size={14} />
          Payment Reminder
        </label>
        {countdownEl}
      </div>

      <motion.input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g., Follow up on Friday, collect ₹800..."
        className="reminder-input"
        whileFocus={{
          borderColor: "rgba(139, 92, 246, 0.5)",
          boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.1)",
        }}
      />

      {value && (
        <motion.div
          className="reminder-active-indicator"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Bell size={12} />
          Reminder set
        </motion.div>
      )}
    </div>
  );
}

export default ReminderBox;
