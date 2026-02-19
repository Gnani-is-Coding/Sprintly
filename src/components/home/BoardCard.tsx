interface BoardCardProps {
  title: string;
  bgColor: string;
  isTemplate?: boolean;
}

function BoardCard({ title, bgColor, isTemplate = false }: BoardCardProps) {
  return (
    <div className="group cursor-pointer">
      <div
        className="relative h-24 sm:h-28 rounded-t-lg"
        style={{ background: bgColor }}
      >
        {isTemplate && (
          <span className="absolute bottom-2 right-2 text-xs font-semibold border border-gray-300 rounded px-1.5 py-0.5 bg-black/30 text-white">
            TEMPLATE
          </span>
        )}
      </div>
      <div className="rounded-b-lg bg-[#282e33] px-3 py-2 group-hover:bg-[#323940] transition-colors">
        <p className="text-sm text-gray-200 truncate">{title}</p>
      </div>
    </div>
  );
}

export default BoardCard;
