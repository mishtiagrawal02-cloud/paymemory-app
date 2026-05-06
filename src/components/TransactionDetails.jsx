import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronDown,
  IndianRupee,
  Layers,
  Lock,
  Pin,
  Repeat,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  Wallet,
} from "lucide-react";

import TagManager from "./TagManager";
import ReminderBox from "./ReminderBox";
import { formatMoney } from "../utils/helpers";

function TransactionDetails({ transaction, onUpdate, onDelete }) {
  const [note, setNote] = useState(transaction.note);
  const [reminder, setReminder] = useState(transaction.reminder);
  const [paidAmount, setPaidAmount] = useState(
    transaction.paidAmount ?? (transaction.amount - (transaction.pendingAmount ?? 0))
  );
  const [saving, setSaving] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    setNote(transaction.note);
    setReminder(transaction.reminder);
    setPaidAmount(transaction.paidAmount ?? (transaction.amount - (transaction.pendingAmount ?? 0)));
  }, [transaction]);

  const totalAmount = transaction.totalAmount ?? transaction.amount;
  const pendingAmount = Math.max(0, totalAmount - paidAmount);
  const progress = totalAmount > 0 ? Math.min(100, Math.round((paidAmount / totalAmount) * 100)) : 0;

  function save() {
    setSaving(true);
    setTimeout(() => {
      onUpdate({
        ...transaction,
        note,
        reminder,
        paidAmount: Number(paidAmount),
        totalAmount,
        pendingAmount,
        timeline: [...transaction.timeline, "Memory updated securely"],
      });
      setSaving(false);
    }, 900);
  }

  return (
    <motion.aside
      key={transaction.id}
      className="details-panel"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 22,
      }}
    >
      <div className="details-header">
        <div>
          <p className="eyebrow">Transaction Detail</p>
          <h2>{transaction.name}</h2>
          <p className="upi-text">{transaction.upiId}</p>
        </div>

        <motion.button
          className="pin-button"
          onClick={() =>
            onUpdate({
              ...transaction,
              pinned: !transaction.pinned,
            })
          }
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Pin size={18} />
        </motion.button>
      </div>

      {transaction.status === "settled" && (
        <motion.div
          className="trust-banner"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ShieldCheck size={18} />
          <span>Settled and memory-locked</span>
          <Lock size={15} />
        </motion.div>
      )}

      <Section title="Core Transaction">
        <div className="details-grid">
          <InfoTile
            icon={<IndianRupee size={18} />}
            label="Amount"
            value={formatMoney(transaction.amount)}
          />

          <InfoTile
            icon={<Layers size={18} />}
            label="Category"
            value={transaction.category}
          />
        </div>
      </Section>

      {totalAmount > 0 && (
        <Section title="Payment Progress">
          <div className="payment-progress-wrap">
            <div className="payment-progress-amounts">
              <div className="payment-progress-stat">
                <span className="pp-label">Total</span>
                <span className="pp-value">{formatMoney(totalAmount)}</span>
              </div>
              <div className="payment-progress-stat">
                <span className="pp-label">Paid</span>
                <span className="pp-value pp-paid">{formatMoney(paidAmount)}</span>
              </div>
              <div className="payment-progress-stat">
                <span className="pp-label">Pending</span>
                <span className="pp-value pp-pending">{formatMoney(pendingAmount)}</span>
              </div>
            </div>

            <div className="payment-progress-bar-wrap">
              <div className="payment-progress-bar-track">
                <motion.div
                  className="payment-progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  style={{
                    background: progress === 100
                      ? "linear-gradient(90deg, #10b981, #34d399)"
                      : progress >= 50
                      ? "linear-gradient(90deg, #8b5cf6, #a78bfa)"
                      : "linear-gradient(90deg, #f59e0b, #fbbf24)",
                  }}
                />
              </div>
              <span className="payment-progress-pct">{progress}%</span>
            </div>

            <div className="payment-paid-input-row">
              <label className="section-label" style={{ marginBottom: 0 }}>Update Paid Amount (₹)</label>
              <motion.input
                type="number"
                value={paidAmount}
                min={0}
                max={totalAmount}
                onChange={(e) => setPaidAmount(Math.min(totalAmount, Math.max(0, Number(e.target.value))))}
                placeholder="Amount paid so far..."
                whileFocus={{
                  borderColor: "rgba(139, 92, 246, 0.5)",
                  boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.1)",
                }}
              />
            </div>
          </div>
        </Section>
      )}

      <Section title="Contextual Memory">
        <label className="section-label">Memory Note</label>
        <motion.textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Add why this payment happened..."
          whileFocus={{
            borderColor: "rgba(139, 92, 246, 0.5)",
            boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.1)",
          }}
        />

        <TagManager transaction={transaction} onUpdate={onUpdate} />
      </Section>

      <motion.button
        className="advanced-toggle"
        onClick={() => setAdvancedOpen((prev) => !prev)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span>Advanced Details</span>

        <motion.span
          animate={{ rotate: advancedOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {advancedOpen && (
          <motion.div
            className="advanced-panel"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <div className="details-grid">
              <InfoTile
                icon={<CalendarDays size={18} />}
                label="Scheduled"
                value={transaction.scheduledDate || "Not set"}
              />

              <InfoTile
                icon={<Repeat size={18} />}
                label="Recurring"
                value={transaction.recurring}
              />
            </div>

            <ReminderBox value={reminder} setValue={setReminder} scheduledDate={transaction.scheduledDate || transaction.dueDate} />

            <StatusSelector transaction={transaction} onUpdate={onUpdate} />
          </motion.div>
        )}
      </AnimatePresence>

      <Section title="Audit Trail">
        <AuditTrail items={transaction.timeline} />
      </Section>

      <div className="details-actions">
        <motion.button
          className="delete-button"
          onClick={() => onDelete(transaction.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Trash2 size={18} />
          Delete Transaction
        </motion.button>

        <motion.button
          className="save-memory-button"
          onClick={save}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {saving ? (
            <motion.span
              className="save-shimmer"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <>
              <Sparkles size={18} />
              Save Memory
            </>
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}

function Section({ title, children }) {
  return (
    <div className="sidebar-section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <motion.div
      className="info-tile"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="info-icon">{icon}</div>
      <p>{label}</p>
      <h4>{value}</h4>
    </motion.div>
  );
}

function StatusSelector({ transaction, onUpdate }) {
  const statuses = ["settled", "pending", "follow-up", "overdue"];

  return (
    <div className="detail-section">
      <label className="section-label">Status</label>

      <div className="status-selector">
        {statuses.map((status) => (
          <motion.button
            key={status}
            onClick={() =>
              onUpdate({
                ...transaction,
                status,
                timeline: [
                  ...transaction.timeline,
                  `Status changed to ${status}`,
                ],
              })
            }
            className={transaction.status === status ? "selected-status" : ""}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status === "settled" && transaction.status === status && (
              <Check size={15} />
            )}
            {status}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function AuditTrail({ items }) {
  return (
    <motion.div
      className="audit-timeline"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={`${item}-${index}`}
          className="audit-item"
          variants={{
            hidden: {
              opacity: 0,
              y: 22,
            },
            show: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <motion.span
            className="audit-node"
            initial={{ scale: 0.7 }}
            animate={{
              scale: [0.7, 1.25, 1],
              boxShadow: [
                "0 0 0 rgba(93,58,155,0)",
                "0 0 0 9px rgba(93,58,155,0.18)",
                "0 0 0 rgba(93,58,155,0)",
              ],
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
            }}
          >
            <Check size={13} />
          </motion.span>

          <div>
            <p>{item}</p>
            <small>Verified memory event</small>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TransactionDetails;