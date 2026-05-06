import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Calendar, Bell, Hash, Plus, Wallet, ArrowDownRight, ArrowUpRight, Clock3 } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";

function AddTransactionModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    upiId: "",
    amount: "",
    paidAmount: "",
    type: "spent",
    category: "Food",
    note: "",
    dueDate: "",
    reminder: "",
    tags: "",
    status: "pending",
    attachment: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  const categories = ["Food", "Transport", "Shopping", "Bills", "Rent", "Loan", "Subscription", "Travel", "College", "Project", "Other"];

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        upiId: "",
        amount: "",
        paidAmount: "",
        type: "spent",
        category: "Food",
        note: "",
        dueDate: "",
        reminder: "",
        tags: "",
        status: "pending",
        attachment: null,
      });
      setErrors({});
    }
  }, [isOpen]);

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (Number(formData.amount) <= 0) newErrors.amount = "Amount must be greater than 0";
    if (!formData.upiId.trim()) newErrors.upiId = "UPI ID is required";
    if (formData.paidAmount !== "" && Number(formData.paidAmount) > Number(formData.amount)) {
      newErrors.paidAmount = "Paid amount cannot exceed total amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const totalAmount = Number(formData.amount);
      const paidAmount = formData.paidAmount !== "" ? Number(formData.paidAmount) : (formData.status === "settled" ? totalAmount : 0);
      const pendingAmount = Math.max(0, totalAmount - paidAmount);

      const newTransaction = {
        name: formData.name,
        upiId: formData.upiId,
        amount: totalAmount,
        totalAmount,
        paidAmount,
        pendingAmount,
        type: formData.type,
        category: formData.category,
        note: formData.note,
        dueDate: formData.dueDate,
        reminder: formData.reminder,
        tags: formData.tags.split(",").map((t) => t.trim()).filter((t) => t),
        status: formData.status,
        scheduledDate: formData.dueDate,
        recurring: "none",
        pinned: false,
        attachment: formData.attachment,
        priority: "medium",
        split: false,
        timeline: ["Transaction created"],
      };

      await new Promise((resolve) => setTimeout(resolve, 500));
      onAdd(newTransaction);
      success("Transaction added successfully!");
      onClose();
    } catch (err) {
      error("Failed to add transaction");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, attachment: file.name });
    }
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="modal-header">
            <h2>Add New Transaction</h2>
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Transaction Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Netflix Subscription"
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className={errors.amount ? "error" : ""}
                />
                {errors.amount && <span className="error-message">{errors.amount}</span>}
              </div>

              <div className="form-group">
                <label>Type</label>
                <div className="type-selector">
                  <button
                    type="button"
                    className={`type-button ${formData.type === "spent" ? "active" : ""}`}
                    onClick={() => setFormData({ ...formData, type: "spent" })}
                  >
                    <ArrowDownRight size={16} />
                    Spent
                  </button>
                  <button
                    type="button"
                    className={`type-button ${formData.type === "received" ? "active" : ""}`}
                    onClick={() => setFormData({ ...formData, type: "received" })}
                  >
                    <ArrowUpRight size={16} />
                    Received
                  </button>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Paid / Received So Far (₹)</label>
                <input
                  type="number"
                  value={formData.paidAmount}
                  onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                  placeholder="Leave blank if fully paid"
                  className={errors.paidAmount ? "error" : ""}
                />
                {errors.paidAmount && <span className="error-message">{errors.paidAmount}</span>}
                {formData.amount && formData.paidAmount !== "" && (
                  <span className="partial-hint">
                    Pending: ₹{Math.max(0, Number(formData.amount) - Number(formData.paidAmount || 0)).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>UPI ID</label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  placeholder="e.g., merchant@upi"
                  className={errors.upiId ? "error" : ""}
                />
                {errors.upiId && <span className="error-message">{errors.upiId}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="settled">Settled</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Add a note about this transaction..."
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Reminder</label>
                <input
                  type="text"
                  value={formData.reminder}
                  onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
                  placeholder="e.g., Pay by next Friday"
                />
              </div>

              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., urgent, monthly"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Attachment</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="attachment"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                  style={{ display: "none" }}
                />
                <label htmlFor="attachment" className="file-upload-label">
                  <Upload size={20} />
                  {formData.attachment || "Choose file"}
                </label>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Transaction"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AddTransactionModal;
