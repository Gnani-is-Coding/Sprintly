import { useAppDispatch } from "@/hooks/app/useAppDispatch";
import { useAppSelector } from "@/hooks/app/useAppSelector";
import { toggleSidebar, closeSidebar } from "@/store/slices/uiSlice";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SidebarContent from "./SidebarContent";
import useResponsive from "@/hooks/useResponsive";

function Sidebar() {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.uiSlice.isSidebarCollapsed,
  );
  const dispatch = useAppDispatch();
  const { isMobileDevice } = useResponsive();

  const mobileSidebar = isSidebarCollapsed ? (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => dispatch(closeSidebar())}
      />

      {/* Drawer */}
      <aside className="absolute top-0 left-0 h-full w-72 bg-[#1d2125] border-r border-[#3a3f44] overflow-y-auto animate-in slide-in-from-left duration-200">
        <div className="flex items-center justify-between px-3 py-3 border-b border-[#3a3f44]">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="text-sm font-bold text-gray-100">Sprintly</span>
          </div>
          <button
            onClick={() => dispatch(closeSidebar())}
            className="p-1 hover:bg-[#282e33] rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="py-2">
          <SidebarContent />
        </div>
      </aside>
    </div>
  ) : null;

  const desktopSidebar = (
    <aside
      className={`hidden lg:flex flex-col bg-[#1d2125] border-r border-[#3a3f44] h-full overflow-y-auto transition-all duration-200 ${
        isSidebarCollapsed ? "w-14" : "w-64"
      }`}
    >
      <div
        className={`flex items-center p-3 ${isSidebarCollapsed ? "justify-center" : "justify-end"}`}
      >
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-1 hover:bg-[#282e33] rounded transition-colors"
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      <SidebarContent collapsed={isSidebarCollapsed} />
    </aside>
  );

  return <>{isMobileDevice ? mobileSidebar : desktopSidebar}</>;
}

export default Sidebar;
