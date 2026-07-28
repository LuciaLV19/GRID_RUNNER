import { useProjectStore } from "../../store/useProjectStore";
import CreateTaskModal from "../tasks/CreateTaskModal";
import TaskBoard from "../tasks/TaskBoard";

/**
 * ProjectView component serves as the primary view for displaying selected project details,
 * task management board, and initiating task creation/editing.
 */
function ProjectView() {
  const {
    activeProjectId,
    projects,
    openTaskModal,
    taskToEdit,
    isOpenModalTask,
  } = useProjectStore();

  const projectSelected = projects.find((p) => p.id === activeProjectId);

  // Fallback empty state when no active project is selected
  if (!projectSelected) {
    return (
      <main className="flex-1 p-6 overflow-y-auto bg-cyber-bg/10 flex flex-col">
        {/* Operations Panel Standby Header */}
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/5 rounded m-4 bg-cyber-card/10">
          <div className="text-center max-w-sm px-4">
            <p className="text-neon-cyan/40 text-xs uppercase tracking-widest mb-2 font-bold animate-pulse">
              [ SYSTEM_STANDBY ]
            </p>
            <p className="text-white/30 text-sm italic font-sans">
              Select a contract from the left panel to synchronize network
              sub-nodes and manage operational tasks.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const totalTasksCount = projectSelected.tasks?.length || 0;

  return (
    <>
      {/* Create/Edit Task Modal */}
      {isOpenModalTask && (
        <CreateTaskModal key={taskToEdit?.id || "new-task"} />
      )}

      <main className="flex-1 bg-black border-l border-neon-cyan/10 p-6 font-mono text-white overflow-y-auto overflow-hidden h-full min-w-0">
        {/* Project Header */}
        <div className="border-b border-neon-cyan/20 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neon-cyan/50 tracking-widest uppercase">
              // ACTIVE_CONTRACT
            </span>
            {/* Total Task Quantity Metric */}
            <span className="text-[10px] text-neon-cyan/60 bg-neon-cyan/10 border border-neon-cyan/20 px-2 py-0.5 rounded font-bold">
              TOTAL TASKS: [{totalTasksCount}]
            </span>
          </div>

          <div className="flex justify-between items-center mt-1">
            <h1 className="text-2xl font-black text-neon-cyan uppercase tracking-wider">
              {projectSelected.name}
            </h1>
            <button
              onClick={openTaskModal}
              className="text-[9px] font-mono text-neon-magenta/60 hover:text-neon-magenta cursor-pointer uppercase tracking-tighter transition-colors"
            >
              [ NEW_TASK ]
            </button>
          </div>

          <p className="text-xs text-neon-cyan/70 mt-2 bg-neon-cyan/5 border border-neon-cyan/10 p-3 rounded">
            {projectSelected.description ||
              "No mission specifications recorded."}
          </p>
        </div>

        {/* Task Board Column View */}
        <div>
          <TaskBoard tasks={projectSelected.tasks} />
        </div>
      </main>
    </>
  );
}

export default ProjectView;
