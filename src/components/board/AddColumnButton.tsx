import { Plus } from "lucide-react";

function AddColumnButton() {
  return (
    <button className="w-72 shrink-0 h-12 flex items-center gap-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-sm text-gray-300 transition-colors">
      <Plus className="w-4 h-4" />
      <span>Add another list</span>
    </button>
  );
}

export default AddColumnButton;
