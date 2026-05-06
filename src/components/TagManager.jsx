import { X } from "lucide-react";
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
    <div className="mt-5">
      <p className="text-sm font-black">Tags</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {transaction.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-3 py-1.5 text-sm font-bold text-cyan-100"
          >
            #{tag}
            <button onClick={() => removeTag(tag)}>
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
          placeholder="Add tag"
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm outline-none focus:border-cyan-300"
        />
        <button
          onClick={addTag}
          className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-black text-slate-950"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default TagManager;