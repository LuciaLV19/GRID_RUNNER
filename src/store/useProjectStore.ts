import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { Project } from "../types/Project";
import type { Task, Status } from "../types/Task";

/**
 * State interface defining state properties and state modification actions
 * for project and task lifecycle management.
 */
interface ProjectState {
  // State variables
  projects: Project[];
  isOpenModalProject: boolean;
  isOpenModalTask: boolean;
  projectToEdit: Project | undefined;
  taskToEdit: Task | undefined;
  activeProjectId: string | undefined;

  // Project management actions
  createProject: (name: string, description: string) => void;
  deleteProject: (id: string) => void;
  updateProject: (projectId: string, data: Partial<Project>) => void;
  editProject: (project: Project) => void;
  toggleFavoriteProject: (id: string) => void;
  setActiveProjectId: (id: string) => void;

  // Modal control actions
  openProjectModal: () => void;
  closeProjectModal: () => void;
  openTaskModal: () => void;
  closeTaskModal: () => void;

  // Task management actions
  createTask: (projectId: string, task: Task) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  moveTask: (projectId: string, taskId: string, status: Status) => void;
  updateTask: (projectId: string, taskId: string, data: Partial<Task>) => void;
  editTask: (task: Task) => void;
  updateColumn: (taskId: string, status: Status) => void;
}

/**
 * Zustand global store for managing projects, active selection, tasks,
 * and modal view states with persistent local storage.
 */
export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      // Initial state variables
      projects: [],
      isOpenModalProject: false,
      isOpenModalTask: false,
      projectToEdit: undefined,
      taskToEdit: undefined,
      activeProjectId: undefined,

      // Active Project Selection
      setActiveProjectId: (id) =>
        set((state) => ({
          activeProjectId: state.activeProjectId === id ? undefined : id,
        })),

      // Project Modals
      openProjectModal: () =>
        set({ isOpenModalProject: true, projectToEdit: undefined }),
      closeProjectModal: () =>
        set({ isOpenModalProject: false, projectToEdit: undefined }),
      editProject: (project) =>
        set({ isOpenModalProject: true, projectToEdit: project }),

      // Task Modals
      openTaskModal: () => set({ isOpenModalTask: true }),
      closeTaskModal: () =>
        set({ isOpenModalTask: false, taskToEdit: undefined }),
      editTask: (task) => set({ isOpenModalTask: true, taskToEdit: task }),

      // Project CRUD Operations
      createProject: (name, description) => {
        const newProject: Project = {
          id: uuidv4(),
          name,
          description,
          createdAt: new Date().toISOString(),
          isFavorite: false,
          tasks: [],
        };

        set((state) => ({
          projects: [...state.projects, newProject],
          activeProjectId: newProject.id, // Auto-select created project
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          activeProjectId:
            state.activeProjectId === id ? undefined : state.activeProjectId,
        }));
      },

      updateProject: (projectId, data) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId ? { ...p, ...data } : p,
          ),
        }));
      },

      toggleFavoriteProject: (id) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, isFavorite: !p.isFavorite } : p,
          ),
        }));
      },

      // Task CRUD Operations
      createTask: (projectId, task) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId ? { ...p, tasks: [...p.tasks, task] } : p,
          ),
        }));
      },

      deleteTask: (projectId, taskId) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
              : p,
          ),
        }));
      },

      moveTask: (projectId, taskId, status) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  tasks: p.tasks.map((t) =>
                    t.id === taskId ? { ...t, status } : t,
                  ),
                }
              : p,
          ),
        }));
      },

      updateTask: (projectId, taskId, data) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  tasks: p.tasks.map((t) =>
                    t.id === taskId ? { ...t, ...data } : t,
                  ),
                }
              : p,
          ),
        }));
      },

      updateColumn: (taskId, status) => {
        set((state) => ({
          projects: state.projects.map((p) => ({
            ...p,
            tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
          })),
        }));
      },
    }),
    {
      name: "project-storage",
    },
  ),
);