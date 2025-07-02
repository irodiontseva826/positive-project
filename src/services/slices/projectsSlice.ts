import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TProjectsStatus, TProject } from "../../utils/types";
import { projects } from "../../utils/constants";

export type TProjectsState = {
  allProjects: TProject[];
  projects: TProject[];
  status: TProjectsStatus;
  loading: boolean;
  error: string | null;
};

export const initialState: TProjectsState = {
  allProjects: [],
  projects: [],
  status: "all",
  loading: false,
  error: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state) => {
      state.allProjects = projects;
      state.projects = projects;
    },
    filterProjects: (state, action: PayloadAction<TProjectsStatus>) => {
      state.status = action.payload;
      state.projects =
        state.status !== "all"
          ? state.allProjects.filter(
              (project) => project.status === action.payload
            )
          : state.allProjects;
    },
  },
  selectors: {
    getProjectsState: (state) => state,
  },
});

export const { setProjects, filterProjects } = projectsSlice.actions;
export const { getProjectsState } = projectsSlice.selectors;
export default projectsSlice.reducer;
