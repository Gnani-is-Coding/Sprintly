import { Plus } from "lucide-react";
import ColumnCard from "./ColumnCard";

interface ColumnProps {
  title: string;
  cards: { id: number; title: string }[];
}

function Column({ title, cards }: ColumnProps) {
  return (
    <div className="w-72 shrink-0 bg-[#101204] rounded-xl flex flex-col max-h-full">
      {/* Column header */}
      <div className="px-3 py-2.5">
        <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
      </div>

      {/* Card list */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2">
        {cards.map((card) => (
          <ColumnCard key={card.id} title={card.title} />
        ))}
      </div>

      {/* Add card button */}
      <div className="px-2 pb-2">
        <button className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:bg-[#282e33] hover:text-gray-200 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add a card</span>
        </button>
      </div>
    </div>
  );
}

export default Column;
