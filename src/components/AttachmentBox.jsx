function AttachmentBox({ transaction, onUpdate, onPreview }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <button
        onClick={() =>
          onUpdate({
            ...transaction,
            attachment: transaction.attachment ? null : "Mock Receipt.pdf",
          })
        }
        className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-black hover:bg-white/10"
      >
        {transaction.attachment ? "Remove Receipt" : "Add Receipt"}
      </button>

      <button
        onClick={onPreview}
        className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-black hover:bg-white/10"
      >
        Preview
      </button>
    </div>
  );
}

export default AttachmentBox;