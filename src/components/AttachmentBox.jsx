import { motion } from "framer-motion";
import { FileText, Eye, X, Check } from "lucide-react";

function AttachmentBox({ transaction, onUpdate, onPreview }) {
  return (
    <div className="attachment-box">
      <p className="section-label">Attachments</p>

      <div className="attachment-buttons">
        <motion.button
          onClick={() =>
            onUpdate({
              ...transaction,
              attachment: transaction.attachment ? null : "Mock Receipt.pdf",
            })
          }
          className={`attachment-button ${transaction.attachment ? "has-attachment" : ""}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {transaction.attachment ? (
            <>
              <X size={16} />
              Remove
            </>
          ) : (
            <>
              <FileText size={16} />
              Add Receipt
            </>
          )}
        </motion.button>

        {transaction.attachment && (
          <motion.button
            onClick={onPreview}
            className="attachment-button preview-button"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye size={16} />
            Preview
          </motion.button>
        )}
      </div>

      {transaction.attachment && (
        <motion.div
          className="attachment-preview"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="attachment-info">
            <Check size={14} className="text-emerald-400" />
            <span>{transaction.attachment}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AttachmentBox;