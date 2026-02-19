import Column from "./Column";
import AddColumnButton from "./AddColumnButton";

const staticColumns = [
  {
    id: 1,
    title: "To Do",
    cards: [
      { id: 1, title: "Set up project repository" },
      { id: 2, title: "Design database schema" },
      { id: 3, title: "Create wireframes for dashboard" },
      { id: 4, title: "Write API documentation" },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    cards: [
      { id: 5, title: "Build authentication flow" },
      { id: 6, title: "Implement drag and drop" },
    ],
  },
  {
    id: 3,
    title: "Done",
    cards: [
      { id: 7, title: "Initialize Vite + React project" },
      { id: 8, title: "Configure Tailwind CSS" },
    ],
  },
];

// Main Board section
function BoardColumns() {
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
      <div className="flex items-start gap-3 h-full">
        {staticColumns.map((column) => (
          <Column key={column.id} title={column.title} cards={column.cards} />
        ))}
        <AddColumnButton />
      </div>
    </div>
  );
}

export default BoardColumns;
