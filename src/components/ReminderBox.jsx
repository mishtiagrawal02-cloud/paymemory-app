import { Bell } from "lucide-react";

function ReminderBox({ value, setValue }) {
  return (
    <div className="mt-5">
      <label className="flex items-center gap-2 text-sm font-black">
        <Bell size={16} />
        Reminder
      </label>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add payment reminder"
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm outline-none focus:border-cyan-300"
      />
    </div>
  );
}

export default ReminderBox;