import { Circle, CircleCheck, MessageSquare, Pencil } from "lucide-react";
import { useState } from "react";
import CardModal from "./CardModal";

interface CardData {
  id: number;
  title: string;
  labels: { color: string; text: string }[];
  commentsCount: number;
  description: string;
}

interface ColumnCardProps {
  card: CardData;
}

function ColumnCard({ card }: ColumnCardProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // in order to prevent this click event Bubbling.

    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className="group/card relative" title="column-card">
      <CardModal card={card}>
        <div
          className={`bg-[#22272b] hover:bg-[#282e33] rounded-lg px-3 py-2 cursor-pointer border hover:border-[#4a5058] transition-colors shadow-sm ${isChecked ? "border-blue-500" : "border-[#3a3f44]"}`}
        >
          {card.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1.5">
              {card.labels.map((label) => (
                <span
                  key={label.text}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-sm text-white"
                  style={{ backgroundColor: label.color }}
                >
                  {label.text}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={(e) => handleCheckboxClick(e)}
              className="p-0.5 lg:opacity-0 lg:group-hover/card:opacity-100 lg:transition-opacity"
            >
              {isChecked ? (
                <CircleCheck className="w-4 h-4 text-blue-500" />
              ) : (
                <Circle className="w-4 h-4 text-gray-500 hover:text-gray-300" />
              )}
            </button>
            {/* Title */}
            <p className="text-sm text-gray-200">{card.title}</p>
          </div>

          {/* Footer: metadata icons */}
          {card.commentsCount > 0 && (
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-gray-500">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="text-xs">{card.commentsCount}</span>
              </div>
            </div>
          )}

          {/* Edit icon — top right on hover */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute top-1.5 right-1.5 p-1 bg-[#282e33] rounded opacity-0 group-hover/card:opacity-100 hover:bg-[#323940] transition-all"
          >
            <Pencil className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </CardModal>
    </div>
  );
}

export default ColumnCard;
