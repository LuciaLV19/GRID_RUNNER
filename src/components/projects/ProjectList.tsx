import { useProjectStore } from "../../store/useProjectStore";
import ProjectCards from "./ProjectCards";
import type { Project } from "../../types/Project";

export default function ProjectList({
  searchQuery,
}: { searchQuery?: string } = {}) {
  // Zustand Store Hooks
  const favoriteProject = useProjectStore(
    (state) => state.toggleFavoriteProject,
  );
  const projectList = useProjectStore((state) => state.projects);

  // Case-insensitive filtering based on project name
  const filteredProjects = searchQuery
    ? projectList.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : projectList;

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Empty State: Rendered when no projects match the filter */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-neon-cyan/20 rounded bg-cyber-card/20">
          <p className="text-xs text-white/40 uppercase tracking-widest font-mono">
            [ NO_CONTRATOS_DISPONIBLES ]
          </p>
        </div>
      ) : (
        /* Project List Render */
        filteredProjects.map((project: Project) => (
          <ProjectCards key={project.id} project={project} />
        ))
      )}
    </div>
  );
}
