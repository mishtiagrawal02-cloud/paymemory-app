import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, tag, note, reminder..."
        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-4 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-300"
      />
    </div>
  );
}

export default SearchBar;