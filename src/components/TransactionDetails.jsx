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
} from "lucide-react";

import TagManager from "./TagManager";
import ReminderBox from "./ReminderBox";
import { formatMoney } from "../utils/helpers";

function TransactionDetails({ transaction, onUpdate }) {
  const [note, setNote] = useState(transaction.note);
  const [reminder, setReminder] = useState(transaction.reminder);
  const [saving, setSaving] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    setNote(transaction.note);
    setReminder(transaction.reminder);
  }, [transaction]);

  function save() {
    setSaving(true);

    setTimeout(() => {
      onUpdate({
        ...transaction,
        note,
        reminder,
        timeline: [...transaction.timeline, "Memory updated securely"],
      });

      setSaving(false);
    }, 900);
  }

  return (
    <motion.aside
      key={transaction.id}
      layoutId={`transaction-card-${transaction.id}`}
      className="details-panel"
      initial={{ opacity: 0, x: 46 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="details-header">
        <div>
          <p className="eyebrow">Transaction Detail</p>
          <h2>{transaction.name}</h2>
          <p className="upi-text">{transaction.upiId}</p>
        </div>

        <button
          className="pin-button"
          onClick={() =>
            onUpdate({
              ...transaction,
              pinned: !transaction.pinned,
            })
          }
        >
          <Pin size={18} />
        </button>
      </div>

      {transaction.status === "settled" && (
        <div className="trust-banner">
          <ShieldCheck size={18} />
          <span>Settled and memory-locked</span>
          <Lock size={15} />
        </div>
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

      <Section title="Contextual Memory">
        <label className="section-label">Memory Note</label>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Add why this payment happened..."
        />

        <TagManager transaction={transaction} onUpdate={onUpdate} />
      </Section>

      <button
        className="advanced-toggle"
        onClick={() => setAdvancedOpen((prev) => !prev)}
      >
        <span>Advanced Details</span>

        <motion.span
          animate={{ rotate: advancedOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

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

            <ReminderBox value={reminder} setValue={setReminder} />

            <StatusSelector transaction={transaction} onUpdate={onUpdate} />
          </motion.div>
        )}
      </AnimatePresence>

      <Section title="Audit Trail">
        <AuditTrail items={transaction.timeline} />
      </Section>

      <button className="save-memory-button" onClick={save} disabled={saving}>
        {saving ? (
          <span className="save-shimmer" />
        ) : (
          <>
            <Save size={18} />
            Save Memory
          </>
        )}
      </button>
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
    <div className="info-tile">
      <div className="info-icon">{icon}</div>
      <p>{label}</p>
      <h4>{value}</h4>
    </div>
  );
}

function StatusSelector({ transaction, onUpdate }) {
  const statuses = ["settled", "pending", "follow-up", "overdue"];

  return (
    <div className="detail-section">
      <label className="section-label">Status</label>

      <div className="status-selector">
        {statuses.map((status) => (
          <button
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
          >
            {status === "settled" && transaction.status === status && (
              <Check size={15} />
            )}
            {status}
          </button>
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