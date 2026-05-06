import { motion } from "framer-motion";
import {
  Clock3,
  Pin,
  Repeat,
  Split,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

function TransactionCard({ transaction, selected, onClick }) {
  const isReceived = transaction.type === "received";

  return (
    <motion.div
      layoutId={`transaction-card-${transaction.id}`}
      onClick={onClick}
      className={`glass-card transaction-card ${selected ? "active-card" : ""}`}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="transaction-card-glow" />

      <div className="card-top">
        <div>
          <div className="card-title-row">
            <h3>{transaction.name}</h3>

            {selected && (
              <span className="selected-dot">
                <ArrowUpRight size={13} />
              </span>
            )}
          </div>

          <p>{transaction.upiId}</p>
        </div>

        <div className="amount-block">
          <span className={`amount ${isReceived ? "amount-positive" : ""}`}>
            {isReceived ? "+" : "-"}₹{transaction.amount}
          </span>
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
        {transaction.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag-pill">
            #{tag}
          </span>
        ))}
      </div>

      <div className="bottom-row">
        <div className={`status-pill ${transaction.status}`}>
          <Clock3 size={14} />
          {transaction.status}
        </div>

        <div className="card-icons">
          {transaction.pinned && (
            <div className="icon-chip" title="Pinned">
              <Pin size={15} />
            </div>
          )}

          {transaction.split && (
            <div className="icon-chip" title="Split Payment">
              <Split size={15} />
            </div>
          )}

          {transaction.recurring !== "none" && (
            <div className="icon-chip" title="Recurring">
              <Repeat size={15} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TransactionCard;