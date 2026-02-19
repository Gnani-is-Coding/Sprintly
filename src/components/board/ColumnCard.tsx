interface ColumnCardProps {
  title: string;
}

function ColumnCard({ title }: ColumnCardProps) {
  return (
    <div className="bg-[#22272b] hover:bg-[#282e33] rounded-lg px-3 py-2 cursor-pointer border border-[#3a3f44] hover:border-[#4a5058] transition-colors shadow-sm">
      <p className="text-sm text-gray-200">{title}</p>
    </div>
  );
}

export default ColumnCard;
