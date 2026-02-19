import { Clock } from "lucide-react";
import BoardCard from "./BoardCard";

const recentBoards = [
  { id: 1, title: "Demo Board", bgColor: "#c77dba" },
  { id: 2, title: "Testing", bgColor: "linear-gradient(135deg, #1a56db, #3b82f6)" },
  { id: 3, title: "Scrum Board", bgColor: "#1a1a2e", isTemplate: true },
  { id: 4, title: "My Tasks | Trello", bgColor: "linear-gradient(135deg, #f59e0b, #ea580c)", isTemplate: true },
];

function RecentlyViewed() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-400" />
        <h2 className="text-base font-semibold text-gray-200">Recently viewed</h2>
      </div>

      {recentBoards.length > 0 ? (<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {recentBoards.map((board) => (
          <BoardCard
            key={board.id}
            id={board.id}
            title={board.title}
            bgColor={board.bgColor}
            isTemplate={board.isTemplate}
          />
        ))}
      </div>) : (
        <div>
        <h1 className="text-xl font-semibold text-center my-8">Explore Now...</h1>
          </div>
      )}

    </section>
  );
}

export default RecentlyViewed;
