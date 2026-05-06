import { motion } from "framer-motion";
import {
  Clock3,
  Pin,
  Repeat,
  Split,
  ArrowUpRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";

function TransactionCard({ transaction, selected, onClick }) {
  const isReceived = transaction.type === "received";

  return (
    <motion.div
      layoutId={`transaction-card-${transaction.id}`}
      onClick={onClick}
      className={`glass-card transaction-card ${selected ? "active-card" : ""}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <motion.div
        className="transaction-card-glow"
        animate={{
          opacity: selected ? 0.6 : 0.15,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="card-top">
        <div>
          <div className="card-title-row">
            <h3>{transaction.name}</h3>

            {selected && (
              <motion.span
                className="selected-dot"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ArrowUpRight size={13} />
              </motion.span>
            )}
          </div>

          <p>{transaction.upiId}</p>
        </div>

        <div className="amount-block">
          <motion.span
            className={`amount ${isReceived ? "amount-positive" : ""}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isReceived ? "+" : "-"}₹{transaction.amount}
          </motion.span>
          <small>{isReceived ? "Received" : "Spent"}</small>
        </div>
      </div>

      <div className="transaction-meta">
        <span>{transaction.category}</span>
        <span>
          <CalendarDays size={13} />
          {transaction.date}
        </span>
      </div>

      <p className="transaction-note">{transaction.note}</p>

      <div className="tag-row">
        {transaction.tags.slice(0, 3).map((tag, index) => (
          <motion.span
            key={tag}
            className="tag-pill"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            #{tag}
          </motion.span>
        ))}
      </div>

      <div className="bottom-row">
        <div className={`status-pill ${transaction.status}`}>
          <Clock3 size={14} />
          {transaction.status}
        </div>

        <div className="card-icons">
          {transaction.pinned && (
            <motion.div
              className="icon-chip"
              title="Pinned"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Pin size={15} />
            </motion.div>
          )}

          {transaction.split && (
            <motion.div
              className="icon-chip"
              title="Split Payment"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <Split size={15} />
            </motion.div>
          )}

          {transaction.recurring !== "none" && (
            <motion.div
              className="icon-chip"
              title="Recurring"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Repeat size={15} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TransactionCard;