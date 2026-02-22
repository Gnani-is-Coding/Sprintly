import { useState, type ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { LayoutTemplate, Presentation, ChevronLeft, X } from "lucide-react";
import { previewColor, preViewBg, templates } from "./constants";

type View = "menu" | "createBoard" | "templates";

type Preview =
  | { type: "image"; value: string }
  | { type: "color"; value: string };

type Side = "top" | "right" | "bottom" | "left";

interface IProps {
  TriggerComponent: ReactNode;
  contentPosition?: { align?: "center" | "start" | "end"; side?: Side };
}

function CreatePopover({ TriggerComponent, contentPosition }: IProps) {
  const [view, setView] = useState<View>("menu");
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<Preview>({
    type: "image",
    value: "/assets/pic-1.jpg",
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setView("menu");
      setPreview({ type: "image", value: "/assets/pic-1.jpg" });
    }
  };

  const handleCreateBoard = () => {
    console.log("Create Button clicked.");
    // #TODO: POST call to create a board, Can try optimistic updates in here,
    // Similarly for creation through template option as well.
  };

  const viewTitles: Record<View, string> = {
    menu: "Create",
    createBoard: "Create Board",
    templates: "Start with a Template",
  };

  const previewStyle =
    preview.type === "image"
      ? {
          backgroundImage: `url(${preview.value})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : { backgroundColor: preview.value };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{TriggerComponent}</PopoverTrigger>

      <PopoverContent
        align={contentPosition?.align || "end"}
        side={contentPosition?.side}
        className="p-0 w-72 bg-[#282e33] border-[#3a3f44]"
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#3a3f44]">
          {view !== "menu" ? (
            <button
              onClick={() => setView("menu")}
              className="p-1 hover:bg-[#323940] rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
          ) : (
            <div className="w-6" />
          )}

          <span className="text-sm font-medium text-gray-200">
            {viewTitles[view]}
          </span>

          <button
            onClick={() => setOpen(false)}
            className="p-1 hover:bg-[#323940] rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="p-2">
          {view === "menu" && (
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setView("createBoard")}
                className="flex items-center gap-3 w-full p-2 rounded hover:bg-[#323940] transition-colors text-left"
              >
                <LayoutTemplate className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Create a new Board
                  </p>
                  <p className="text-xs text-gray-500">
                    Start from scratch with an empty board
                  </p>
                </div>
              </button>

              <button
                onClick={() => setView("templates")}
                className="flex items-center gap-3 w-full p-2 rounded hover:bg-[#323940] transition-colors text-left"
              >
                <Presentation className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Start with a Template
                  </p>
                  <p className="text-xs text-gray-500">
                    Get started faster with a pre-built board
                  </p>
                </div>
              </button>
            </div>
          )}

          {view === "createBoard" && (
            <div className="flex flex-col gap-3 p-1">
              <div
                className="w-full h-32 rounded-lg p-2 flex items-start justify-center gap-1.5 transition-all duration-200 overflow-hidden relative"
                style={previewStyle}
              >
                <div className="w-14 h-[85%] bg-white/40 rounded-sm flex flex-col gap-1 p-1">
                  <div className="w-7 bg-gray-400/50 h-1 rounded-full" />
                  <div className="w-full bg-white/70 h-3.5 rounded-sm" />
                  <div className="w-full bg-white/70 h-2.5 rounded-sm">
                    <div className="w-6 bg-gray-400/40 h-0.5 rounded-full mt-0.5 ml-0.5" />
                  </div>
                  <div className="w-full bg-white/70 h-3 rounded-sm" />
                </div>

                <div className="w-14 h-full bg-white/40 rounded-sm flex flex-col gap-1 p-1">
                  <div className="w-8 bg-gray-400/50 h-1 rounded-full" />
                  <div className="w-full bg-white/70 h-3 rounded-sm">
                    <div className="w-7 bg-gray-400/40 h-0.5 rounded-full mt-0.5 ml-0.5" />
                  </div>
                  <div className="w-full bg-white/70 h-2.5 rounded-sm" />
                  <div className="w-full bg-white/70 h-3.5 rounded-sm">
                    <div className="w-5 bg-gray-400/40 h-0.5 rounded-full mt-0.5 ml-0.5" />
                    <div className="w-8 bg-gray-400/30 h-0.5 rounded-full mt-0.5 ml-0.5" />
                  </div>
                  <div className="w-full bg-white/70 h-2.5 rounded-sm" />
                </div>

                <div className="w-14 h-[70%] bg-white/40 rounded-sm flex flex-col gap-1 p-1">
                  <div className="w-6 bg-gray-400/50 h-1 rounded-full" />
                  <div className="w-full bg-white/70 h-3 rounded-sm" />
                  <div className="w-full bg-white/70 h-3 rounded-sm">
                    <div className="w-6 bg-gray-400/40 h-0.5 rounded-full mt-0.5 ml-0.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1 block">
                  Board title
                </label>
                <input
                  type="text"
                  placeholder="Enter board title..."
                  className="w-full px-3 py-1.5 text-sm bg-[#282e33] border border-[#3a3f44] rounded text-gray-200 placeholder:text-gray-500 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Background
                </label>
                <div className="flex gap-2 mb-2">
                  {preViewBg.map((bg) => (
                    <button
                      key={bg.id}
                      className="w-10 h-8 rounded bg-cover bg-center hover:ring-2 hover:ring-white/30 transition-all"
                      style={{ backgroundImage: `url(${bg.imgUrl})` }}
                      onClick={() =>
                        setPreview({ type: "image", value: bg.imgUrl })
                      }
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {previewColor.map((color) => (
                    <button
                      key={color}
                      className="w-10 h-8 rounded hover:ring-2 hover:ring-white/30 transition-all"
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        setPreview({ type: "color", value: color })
                      }
                    />
                  ))}
                </div>
              </div>

              <button
                className="w-full py-1.5 text-sm font-medium rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors mt-1"
                onClick={handleCreateBoard}
              >
                Create
              </button>
            </div>
          )}

          {view === "templates" && (
            <div className="flex flex-col gap-1">
              {templates.map((template) => (
                <button
                  key={template.id}
                  className="flex items-center gap-3 w-full p-2 rounded hover:bg-[#323940] transition-colors text-left"
                >
                  <div
                    className="w-8 h-6 rounded shrink-0"
                    style={{ backgroundColor: template.bgColor }}
                  />
                  <span className="text-sm text-gray-200">
                    {template.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CreatePopover;
