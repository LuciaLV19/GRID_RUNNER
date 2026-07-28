import { useState } from "react";
import type { Priority, Status } from "../../types/Task";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  commentsCount: number;
  dueDate?: string;
  category?: string;
  assignee?: {
    id: string;
    name: string;
    initials: string;
  };
}

/**
 * TaskCard component renders an individual task item within a Kanban column.
 * Displays key details including priority, assignee, category, due dates, and comment counts.
 */
export default function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  createdAt,
  commentsCount,
  dueDate,
  assignee,
  category,
}: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic styling based on task priority level
  const priorityColors: Record<Priority, string> = {
    high: "bg-red-500/10 text-red-400 border-red-500/30",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    low: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30",
  };

  /**
   * Formats string dates into concise, readable representations.
   */
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
    } catch {
      return dateString;
    }
  };

  /**
   * Prepares drag-and-drop payload with task ID.
   */
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    e.dataTransfer.setData("text/plain", taskId);
    setTimeout(() => setIsDragging(true), 0);
  };

  return (
    <div
      draggable={true}
      onDragStart={(e) => handleDragStart(e, id)}
      onDragEnd={() => setIsDragging(false)}
      className={`group bg-black p-3 rounded border border-white/10 hover:border-neon-cyan/30 transition-all duration-200 cursor-grab active:cursor-grabbing flex flex-col justify-between min-h-35 font-mono shadow-[0_4px_12px_rgba(0,0,0,0.6)] ${
        isDragging ? "opacity-20" : ""
      }`}
    >
      {/* 1. Header: Category Tag & Priority Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className="text-[9px] font-bold tracking-widest text-white/40 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase truncate max-w-35"
            title={category || "General"}
          >
            // {category || "General"}
          </span>
          <span
            className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${priorityColors[priority]}`}
          >
            {priority}
          </span>
        </div>

        {/* 2. Content: Title & Brief Description */}
        <h4 className="text-xs font-bold text-white/90 line-clamp-1 group-hover:text-neon-cyan transition-colors mb-1 leading-snug uppercase">
          {title}
        </h4>

        {description && (
          <p className="text-[10px] text-white/50 line-clamp-2 leading-relaxed mb-2 font-sans italic">
            {description}
          </p>
        )}
      </div>

      {/* 3. Metadata: Dates, Metrics & Assignee */}
      <div>
        {/* Visual divider line */}
        <div className="w-full border-t border-dashed border-white/10 mb-2" />

        <div className="flex items-center justify-between text-white/40 text-[10px]">
          {/* Left section: Due Date & Comments Counter */}
          <div className="flex items-center gap-2">
            {dueDate && (
              <div
                className="flex items-center gap-1 text-[9px] font-medium text-white/70 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded"
                title="Due date"
              >
                <span>DUE: {formatDate(dueDate)?.toUpperCase()}</span>
              </div>
            )}

            {/* Strict comments counter */}
            {commentsCount > 0 && (
              <div
                className="flex items-center gap-1 text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20 px-1.5 py-0.5 rounded text-[9px]"
                title={`${commentsCount} comments`}
              >
                <span>COMMS:</span>
                <span className="font-black">[{commentsCount}]</span>
              </div>
            )}
          </div>

          {/* Right section: Shortened ID & Assignee Initials */}
          <div className="flex items-center gap-1.5">
            <span
              className="text-[8px] text-white/20 tracking-tighter"
              title="Unique node ID"
            >
              #{id.slice(0, 4).toUpperCase()}
            </span>

            {assignee ? (
              <div
                className="h-5 w-5 rounded bg-neon-cyan/20 border border-neon-cyan text-neon-cyan flex items-center justify-center text-[9px] font-black shadow-sm"
                title={assignee.name}
              >
                {assignee.initials.toUpperCase()}
              </div>
            ) : (
              <div
                className="h-5 w-5 rounded border border-white/10 border-dashed flex items-center justify-center text-[9px] font-medium text-white/20"
                title="Unassigned"
              >
                N/A
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
