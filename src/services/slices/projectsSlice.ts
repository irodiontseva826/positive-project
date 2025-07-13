import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProjectsStatus, Project } from "../../utils/types";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { customAlphabet } from "nanoid";
import { getProjectsApi } from "../../utils/api";

dayjs.locale("ru");

export const getProjects = createAsyncThunk("projects/getAll", getProjectsApi);

export type ProjectsState = {
  allProjects: Project[];
  projects: Project[];
  status: ProjectsStatus;
  searchText: string;
  loading: boolean;
  error: string | null;
};

export const initialState: ProjectsState = {
  allProjects: [],
  projects: [],
  status: "all",
  searchText: "",
  loading: false,
  error: null,
};

const filterProjects = (state: ProjectsState) => {
  const filteredProjects =
    state.status !== "all"
      ? state.allProjects.filter((project) => project.status === state.status)
      : state.allProjects;

  state.projects = state.searchText
    ? filteredProjects.filter((project) =>
        project.name.toLowerCase().includes(state.searchText.toLowerCase())
      )
    : filteredProjects;
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    searchProjects: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      filterProjects(state);
    },
    filterProjectsByStatus: (state, action: PayloadAction<ProjectsStatus>) => {
      state.status = action.payload;
      filterProjects(state);
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.allProjects = state.allProjects.filter(
        (project) => project.id != action.payload
      );
      filterProjects(state);
    },
    editProject: (state, action: PayloadAction<Project>) => {
      const project = state.allProjects.find(
        (project) => project.id === action.payload.id
      );
      project!.name = action.payload.name;
      project!.description = action.payload.description;
      project!.updatedAt = dayjs().format("D MMM HH:mm");
      filterProjects(state);
    },
    addProject: (state, action: PayloadAction<Project>) => {
      const nanoid = customAlphabet("0123456789", 10);
      state.allProjects.push({
        id: Number(nanoid()),
        name: action.payload.name,
        description: action.payload.description,
        status: "active",
        template: {
          id: 1,
          name: "Template 1",
        },
        createdAt: dayjs().format("D MMM"),
        updatedAt: dayjs().format("D MMM HH:mm"),
        lastRun: "-",
        steps: [],
      });
      filterProjects(state);
    },
  },
  selectors: {
    getProjectsState: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.allProjects = action.payload;
        state.projects = action.payload;
        state.error = null;
      });
  },
});

export const {
  filterProjectsByStatus,
  searchProjects,
  removeProject,
  editProject,
  addProject,
} = projectsSlice.actions;
export const { getProjectsState } = projectsSlice.selectors;
export default projectsSlice.reducer;
