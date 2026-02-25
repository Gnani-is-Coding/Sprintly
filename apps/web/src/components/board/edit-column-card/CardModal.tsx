import { type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog";
import {
  AlignLeft,
  MessageSquare,
  Tag,
  User,
  CalendarDays,
  Paperclip,
  Copy,
  ArrowRight,
  Archive,
  Share2,
} from "lucide-react";

interface CardData {
  id: number;
  title: string;
  labels: { color: string; text: string }[];
  commentsCount: number;
  description: string;
}

interface CardModalProps {
  card: CardData;
  children: ReactNode;
}

const sidebarActions = [
  { icon: User, label: "Members" },
  { icon: Tag, label: "Labels" },
  { icon: CalendarDays, label: "Dates" },
  { icon: Paperclip, label: "Attachment" },
];

const cardActions = [
  { icon: ArrowRight, label: "Move" },
  { icon: Copy, label: "Copy" },
  { icon: Share2, label: "Share" },
  { icon: Archive, label: "Archive" },
];

const staticComments = [
  {
    id: 1,
    author: "Gnani",
    avatar: "G",
    text: "Should we use Prisma for this?",
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Alice",
    avatar: "A",
    text: "Yes, Prisma with PostgreSQL.",
    time: "1 hour ago",
  },
];

function CardModal({ card, children }: CardModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showCloseButton
        className="bg-[#282e33] border-[#3a3f44] p-0 sm:max-w-2xl max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <DialogTitle className="text-lg font-semibold text-gray-100">
            {card.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500 mt-1">
            in list <span className="text-gray-400 underline">Column Name</span>
          </DialogDescription>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 px-6 pb-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Labels */}
            {card.labels.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Labels
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {card.labels.map((label) => (
                    <span
                      key={label.text}
                      className="text-xs font-medium px-2 py-1 rounded text-white"
                      style={{ backgroundColor: label.color }}
                    >
                      {label.text}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlignLeft className="w-4 h-4 text-gray-400" />
                <h4 className="text-sm font-semibold text-gray-200">
                  Description
                </h4>
              </div>
              {card.description ? (
                <p className="text-sm text-gray-300 bg-[#22272b] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#1d2125] transition-colors">
                  {card.description}
                </p>
              ) : (
                <div className="text-sm text-gray-500 bg-[#22272b] rounded-lg px-3 py-6 cursor-pointer hover:bg-[#1d2125] transition-colors">
                  Add a more detailed description...
                </div>
              )}
            </div>

            {/* Activity / Comments */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <h4 className="text-sm font-semibold text-gray-200">
                  Activity
                </h4>
              </div>

              {/* Comment input */}
              <div className="flex items-start gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                  G
                </div>
                <div className="flex-1 bg-[#22272b] border border-[#3a3f44] rounded-lg px-3 py-2 text-sm text-gray-500 cursor-pointer hover:border-[#4a5058] transition-colors">
                  Write a comment...
                </div>
              </div>

              {/* Comments list */}
              <div className="space-y-3">
                {staticComments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#3a3f44] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-gray-200">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 bg-[#22272b] rounded-lg px-3 py-2 mt-1">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full sm:w-40 shrink-0">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Add to card
            </h4>
            <div className="flex flex-col gap-1.5 mb-4">
              {sidebarActions.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex items-center gap-2 w-full px-3 py-1.5 rounded text-sm text-gray-300 bg-[#22272b] hover:bg-[#323940] transition-colors text-left"
                >
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Actions
            </h4>
            <div className="flex flex-col gap-1.5">
              {cardActions.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex items-center gap-2 w-full px-3 py-1.5 rounded text-sm text-gray-300 bg-[#22272b] hover:bg-[#323940] transition-colors text-left"
                >
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CardModal;
