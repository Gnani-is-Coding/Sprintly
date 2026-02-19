import { useLocation, useNavigate } from "react-router-dom";
import { MailCheck, CalendarDays, Columns3, LayoutGrid } from "lucide-react";

const navItems = [
  { icon: MailCheck, label: "Inbox", path: "/inbox" },
  { icon: CalendarDays, label: "Planner", path: "/planner" },
  { icon: Columns3, label: "Board", path: "/" },
  { icon: LayoutGrid, label: "Switch boards", path: "/switch" },
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="lg:hidden flex items-center justify-around bg-[#1a1d20] border-t border-[#3a3f44] px-2 py-2">
      {navItems.map(({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              isActive
                ? "bg-[#282e33] text-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] sm:text-xs hidden sm:inline">{label}</span>
            {isActive && (
              <div className="absolute bottom-1.5 w-4 h-0.5 bg-blue-400 rounded-full sm:hidden" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
