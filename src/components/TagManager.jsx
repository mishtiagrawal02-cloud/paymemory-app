import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Hash } from "lucide-react";
import { useState } from "react";

function TagManager({ transaction, onUpdate }) {
  const [newTag, setNewTag] = useState("");

  function addTag() {
    const clean = newTag.trim().toLowerCase();
    if (!clean || transaction.tags.includes(clean)) return;

    onUpdate({
      ...transaction,
      tags: [...transaction.tags, clean],
      timeline: [...transaction.timeline, `Tag #${clean} added`],
    });

    setNewTag("");
  }

  function removeTag(tag) {
    onUpdate({
      ...transaction,
      tags: transaction.tags.filter((t) => t !== tag),
      timeline: [...transaction.timeline, `Tag #${tag} removed`],
    });
  }

  return (
    <div className="tag-manager">
      <p className="section-label">
        <Hash size={14} />
        Tags
      </p>

      <motion.div className="tag-list" layout>
        <AnimatePresence mode="popLayout">
          {transaction.tags.map((tag) => (
            <motion.span
              key={tag}
              className="tag-pill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              layout
            >
              #{tag}
              <motion.button
                onClick={() => removeTag(tag)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={12} />
              </motion.button>
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="tag-input-row">
        <motion.input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
          placeholder="Add a tag..."
          className="tag-input"
          whileFocus={{
            borderColor: "rgba(139, 92, 246, 0.5)",
            boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.1)",
          }}
        />
        <motion.button
          onClick={addTag}
          className="add-tag-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles size={16} />
          Add
        </motion.button>
      </div>
    </div>
  );
}

export default TagManager;