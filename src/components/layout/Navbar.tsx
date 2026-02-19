import {
  LayoutGrid,
  Search,
  MoreHorizontal,
  Bell,
  CircleHelp,
} from "lucide-react";

function Navbar() {
  return (
    <header className="h-12 bg-[#1d2125] border-b border-[#3a3f44] flex items-center px-3 lg:px-4 gap-2">
      {/* Left section */}
      <button className="p-1.5 hover:bg-[#323940] rounded transition-colors">
        <LayoutGrid className="w-4 h-4 text-gray-300" />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">S</span>
        </div>
        <span className="hidden lg:inline text-base font-bold text-gray-100">
          Sprintly
        </span>
      </div>

      {/* Desktop search bar */}
      <div className="hidden lg:flex flex-1 max-w-xl mx-auto">
        <div className="flex items-center gap-2 w-full bg-[#282e33] border border-[#3a3f44] rounded px-3 py-1.5">
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Search</span>
        </div>
      </div>

      {/* Mobile spacer */}
      <div className="flex-1 lg:hidden" />

      {/* Mobile search icon */}
      <button className="p-1.5 hover:bg-[#323940] rounded transition-colors lg:hidden">
        <Search className="w-4 h-4 text-gray-300" />
      </button>

      {/* Create button */}
      <button className="px-3 py-1 text-sm font-medium rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors">
        Create
      </button>

      {/* Desktop right icons */}
      <div className="hidden lg:flex items-center gap-1">
        <button className="p-1.5 hover:bg-[#323940] rounded transition-colors">
          <Bell className="w-4 h-4 text-gray-300" />
        </button>
        <button className="p-1.5 hover:bg-[#323940] rounded transition-colors">
          <CircleHelp className="w-4 h-4 text-gray-300" />
        </button>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold ml-1">
          G
        </div>
      </div>

      {/* Mobile more icon */}
      <button className="p-1.5 hover:bg-[#323940] rounded transition-colors lg:hidden">
        <MoreHorizontal className="w-4 h-4 text-gray-300" />
      </button>
    </header>
  );
}

export default Navbar;
