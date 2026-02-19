import {
  LayoutGrid,
  Users,
  Settings,
  Crown,
  ChevronDown,
} from "lucide-react";
import BoardCard from "./BoardCard";
import CreateBoardCard from "./CreateBoardCard";

const actionButtons = [
  { icon: LayoutGrid, label: "Boards" },
  { icon: Users, label: "Members" },
  { icon: Settings, label: "Settings" },
  { icon: Crown, label: "Upgrade", accent: true },
];

const workspaceBoards = [
  { id: 1, title: "Demo Board", bgColor: "#c77dba" },
  { id: 2, title: "Testing", bgColor: "linear-gradient(135deg, #1a56db, #3b82f6)" },
];

function WorkspaceSection() {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
        Your Workspaces
      </h3>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
            G
          </div> {/* #TODO: add a real icon/avatar in here */}
          <h4 className="text-base font-semibold text-gray-200 truncate">
            GNANENDRA GARIMINTI's workspace
          </h4>
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 hidden lg:block" />
        </div>

        <div className="grid grid-cols-2 lg:flex gap-2">
          {actionButtons.map(({ icon: Icon, label, accent }) => (
            <button
              key={label}
              className={`flex items-center gap-2 px-3 py-2 lg:py-1.5 rounded text-sm transition-colors ${
                accent
                  ? "bg-purple-900/40 text-purple-300 hover:bg-purple-900/60"
                  : "bg-[#282e33] text-gray-300 hover:bg-[#323940]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {workspaceBoards.map((board) => (
          <BoardCard
            key={board.id}
            title={board.title}
            bgColor={board.bgColor}
          />
        ))}
        <CreateBoardCard />
      </div>

      <button className="text-sm text-gray-400 hover:text-gray-200 bg-[#282e33] hover:bg-[#323940] px-4 py-2 rounded transition-colors">
        View all closed boards
      </button>
    </section>
  );
}

export default WorkspaceSection;
