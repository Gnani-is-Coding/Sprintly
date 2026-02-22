import {
  LayoutDashboard,
  Layers,
  Home,
  ChevronUp,
  Users,
  Settings,
  Plus,
} from "lucide-react";

const navLinks = [
  { icon: LayoutDashboard, label: "Boards", active: true },
  { icon: Layers, label: "Templates" },
  { icon: Home, label: "Home" },
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#1d2125] border-r border-[#3a3f44] h-full overflow-y-auto">
      <nav className="p-3 space-y-0.5">
        {navLinks.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`flex items-center gap-3 w-full px-3 py-1.5 rounded text-sm transition-colors ${
              active
                ? "bg-blue-600/20 text-blue-400"
                : "text-gray-300 hover:bg-[#282e33]"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-[#3a3f44] mx-3" />

      <div className="p-3">
        <p className="text-xs font-semibold text-gray-400 mb-2">Workspaces</p>

        <div>
          <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded hover:bg-[#282e33] transition-colors">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              G
            </div>
            <span className="text-sm text-gray-200 truncate flex-1 text-left">
              GNANENDRA GARIMINTI 2060671's workspace
            </span>
            <ChevronUp className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>

          {/* Workspace sub-nav */}
          <div className="ml-4 mt-1 space-y-0.5">
            <button className="flex items-center gap-3 w-full px-3 py-1.5 rounded text-sm text-gray-300 hover:bg-[#282e33] transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              <span>Boards</span>
            </button>
            <button className="flex items-center justify-between w-full px-3 py-1.5 rounded text-sm text-gray-300 hover:bg-[#282e33] transition-colors">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Members</span>
              </div>
              <Plus className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button className="flex items-center gap-3 w-full px-3 py-1.5 rounded text-sm text-gray-300 hover:bg-[#282e33] transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
