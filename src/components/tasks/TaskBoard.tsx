import Column from "../projects/Column";
import type { Task } from "../../types/Task";

interface TaskBoardProps {
  tasks: Task[];
}

/**
 * TaskBoard component renders a Kanban-style layout divided into status columns.
 * Displays real-time task counts for each board column.
 */
export default function TaskBoard({ tasks }: TaskBoardProps) {
  // Filter tasks into respective status groups
  const backlogTasks = tasks.filter((t) => t.status === "backlog");
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const testingTasks = tasks.filter((t) => t.status === "testing");
  const doneTasks = tasks.filter((t) => t.status === "compiled");

  return (
    <div className="flex gap-4 pb-4 w-full overflow-x-auto min-h-0 select-none">
      <Column
        title={`BACKLOG (${backlogTasks.length})`}
        tasks={backlogTasks}
        status="backlog"
      />
      <Column
        title={`TO DO (${todoTasks.length})`}
        tasks={todoTasks}
        status="todo"
      />
      <Column
        title={`IN PROGRESS (${inProgressTasks.length})`}
        tasks={inProgressTasks}
        status="in_progress"
      />
      <Column
        title={`TESTING (${testingTasks.length})`}
        tasks={testingTasks}
        status="testing"
      />
      <Column
        title={`DONE (${doneTasks.length})`}
        tasks={doneTasks}
        status="compiled"
      />
    </div>
  );
}
