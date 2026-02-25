import { Star, Lock, MoreHorizontal } from "lucide-react";

interface BoardHeaderProps {
  title: string;
}

function BoardHeader({ title }: BoardHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-black/20">
      <h1 className="text-lg font-bold text-white">{title}</h1>
      <button className="p-1 hover:bg-white/10 rounded transition-colors">
        <Star className="w-4 h-4 text-gray-300" />
      </button>
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Lock className="w-3 h-3" />
        <span>Workspace visible</span>
      </div>
      <div className="flex-1" />
      <button className="p-1 hover:bg-white/10 rounded transition-colors">
        <MoreHorizontal className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );
}

export default BoardHeader;
