import { Search } from "lucide-react";

function EmptyState() {
  return (
    <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.05] p-10 text-center">
      <Search className="mx-auto text-cyan-200" size={42} />
      <h3 className="mt-4 text-xl font-black">No transaction found</h3>
      <p className="mt-2 text-sm text-slate-400">
        Try changing your search or filters.
      </p>
    </div>
  );
}

export default EmptyState;