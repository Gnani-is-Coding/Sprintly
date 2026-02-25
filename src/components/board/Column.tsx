import { useState, useRef, useEffect } from "react";
import { Plus, MoreHorizontal, X } from "lucide-react";
import ColumnCard from "./edit-column-card/ColumnCard";

interface CardData {
  id: number;
  title: string;
  labels: { color: string; text: string }[];
  commentsCount: number;
  description: string;
}

interface ColumnProps {
  title: string;
  cards: CardData[];
}

function Column({ title, cards }: ColumnProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAddingCard && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAddingCard]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleAddCard = () => {
    if (cardTitle.trim()) {
      // TODO: wire up to mutation
      console.log("Add card:", cardTitle);
    }
    setCardTitle("");
    setIsAddingCard(false);
  };

  const handleTitleSave = () => {
    if (!columnTitle.trim()) {
      setColumnTitle(title);
    }
    // TODO: wire up to mutation
    setIsEditingTitle(false);
  };

  return (
    <div className="w-72 shrink-0 bg-[#101204] rounded-xl flex flex-col max-h-full">
      <div className="flex items-center justify-between px-3 py-2.5 group">
        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleSave();
              if (e.key === "Escape") {
                setColumnTitle(title);
                setIsEditingTitle(false);
              }
            }}
            className="text-sm font-semibold text-gray-200 bg-[#22272b] border border-blue-500 rounded px-1.5 py-0.5 outline-none w-full"
          />
        ) : (
          <h3
            className="text-sm font-semibold text-gray-200 cursor-pointer px-1.5 py-0.5 rounded hover:bg-[#282e33] flex-1"
            onClick={() => setIsEditingTitle(true)}
          >
            {columnTitle}
          </h3>
        )}
        <button className="p-1 hover:bg-[#282e33] rounded transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2">
        {cards.map((card) => (
          <ColumnCard key={card.id} card={card} />
        ))}
      </div>

      {isAddingCard ? (
        <div className="px-2 pb-2">
          <textarea
            ref={textareaRef}
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddCard();
              }
              if (e.key === "Escape") {
                setCardTitle("");
                setIsAddingCard(false);
              }
            }}
            onBlur={handleAddCard}
            placeholder="Enter a title for this card..."
            className="w-full px-3 py-2 text-sm bg-[#22272b] border border-[#3a3f44] rounded-lg text-gray-200 placeholder:text-gray-500 outline-none focus:border-blue-500 resize-none transition-colors"
            rows={2}
          />
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleAddCard}
              className="px-3 py-1.5 text-sm font-medium rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Add card
            </button>
            <button
              onClick={() => {
                setCardTitle("");
                setIsAddingCard(false);
              }}
              className="p-1.5 hover:bg-[#282e33] rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ) : (
        <div className="px-2 pb-2">
          <button
            className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:bg-[#282e33] hover:text-gray-200 transition-colors"
            onClick={() => setIsAddingCard(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Add a card</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Column;
