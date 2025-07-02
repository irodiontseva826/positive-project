import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TProjectsStatus, TProject } from "../../utils/types";
import { projects } from "../../utils/constants";

export type TProjectsState = {
  allProjects: TProject[];
  projects: TProject[];
  status: TProjectsStatus;
  searchText: string;
  loading: boolean;
  error: string | null;
};

export const initialState: TProjectsState = {
  allProjects: [],
  projects: [],
  status: "all",
  searchText: "",
  loading: false,
  error: null,
};

const filterProjects = (state: TProjectsState) => {
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
    setProjects: (state) => {
      state.allProjects = projects;
      state.projects = projects;
    },
    searchProjects: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      filterProjects(state);
    },
    filterProjectsByStatus: (state, action: PayloadAction<TProjectsStatus>) => {
      state.status = action.payload;
      filterProjects(state);
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.allProjects = state.allProjects.filter(
        (project) => project.id != action.payload
      );
      filterProjects(state);
    },
  },
  selectors: {
    getProjectsState: (state) => state,
  },
});

export const {
  setProjects,
  filterProjectsByStatus,
  searchProjects,
  removeProject,
} = projectsSlice.actions;
export const { getProjectsState } = projectsSlice.selectors;
export default projectsSlice.reducer;
