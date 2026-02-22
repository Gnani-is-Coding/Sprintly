import { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import Column from "./Column";

const staticColumns = [
  {
    id: 1,
    title: "To Do",
    cards: [
      {
        id: 1,
        title: "Set up project repository",
        labels: [{ color: "#dc2626", text: "Urgent" }],
        commentsCount: 2,
        description:
          "Initialize the Git repository and set up branch protection rules.",
      },
      {
        id: 2,
        title: "Design database schema",
        labels: [{ color: "#1a56db", text: "Backend" }],
        commentsCount: 0,
        description: "",
      },
      {
        id: 3,
        title: "Create wireframes for dashboard",
        labels: [
          { color: "#0e9f6e", text: "Design" },
          { color: "#e3a008", text: "Frontend" },
        ],
        commentsCount: 5,
        description:
          "Create low-fidelity wireframes for the main dashboard view.",
      },
      {
        id: 4,
        title: "Write API documentation",
        labels: [],
        commentsCount: 0,
        description:
          "Document all REST endpoints with request/response examples.",
      },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    cards: [
      {
        id: 5,
        title: "Build authentication flow",
        labels: [
          { color: "#1a56db", text: "Backend" },
          { color: "#dc2626", text: "Urgent" },
        ],
        commentsCount: 3,
        description: "Implement JWT-based auth with refresh tokens.",
      },
      {
        id: 6,
        title: "Implement drag and drop",
        labels: [{ color: "#e3a008", text: "Frontend" }],
        commentsCount: 0,
        description: "",
      },
    ],
  },
  {
    id: 3,
    title: "Done",
    cards: [
      {
        id: 7,
        title: "Initialize Vite + React project",
        labels: [{ color: "#0e9f6e", text: "Setup" }],
        commentsCount: 1,
        description: "Scaffolded with Vite + React + TypeScript template.",
      },
      {
        id: 8,
        title: "Configure Tailwind CSS",
        labels: [{ color: "#0e9f6e", text: "Setup" }],
        commentsCount: 0,
        description: "Installed Tailwind v4 with @tailwindcss/vite plugin.",
      },
    ],
  },
];

function BoardColumns() {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [columnName, setColumnName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddColumn = () => {
    if (columnName.trim()) {
      // TODO: wire up to mutation
      console.log("Add column:", columnName);
    }
    setColumnName("");
    setIsAddingColumn(false);
  };

  useEffect(() => {
    if (isAddingColumn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingColumn]);

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
      <div className="flex items-start gap-3 h-full">
        {staticColumns.map((column) => (
          <Column key={column.id} title={column.title} cards={column.cards} />
        ))}

        {isAddingColumn ? (
          <div className="w-72 shrink-0 bg-[#101204] rounded-xl p-2">
            <input
              ref={inputRef}
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddColumn();
                if (e.key === "Escape") {
                  setColumnName("");
                  setIsAddingColumn(false);
                }
              }}
              onBlur={handleAddColumn}
              placeholder="Enter list title..."
              className="w-full px-3 py-1.5 text-sm bg-[#22272b] border border-[#3a3f44] rounded text-gray-200 placeholder:text-gray-500 outline-none focus:border-blue-500 transition-colors"
            />
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={handleAddColumn}
                className="px-3 py-1.5 text-sm font-medium rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Add list
              </button>
              <button
                onClick={() => {
                  setColumnName("");
                  setIsAddingColumn(false);
                }}
                className="p-1.5 hover:bg-[#282e33] rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingColumn(true)}
            className="w-72 shrink-0 h-12 flex items-center gap-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-sm text-gray-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add another list</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default BoardColumns;
