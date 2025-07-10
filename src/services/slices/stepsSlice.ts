import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { customAlphabet } from "nanoid";
import type { ProjectStep } from "../../utils/types";

dayjs.locale("ru");

export type StepsState = {
  allSteps: ProjectStep[];
  steps: ProjectStep[];
  searchText: string;
  loading: boolean;
  error: string | null;
};

export const initialState: StepsState = {
  allSteps: [],
  steps: [],
  searchText: "",
  loading: false,
  error: null,
};

const filterSteps = (state: StepsState) => {
  state.steps = state.searchText
    ? state.allSteps.filter((step) =>
        step.name.toLowerCase().includes(state.searchText.toLowerCase())
      )
    : state.allSteps;
};

export const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    setSteps: (state, action: PayloadAction<ProjectStep[]>) => {
      state.allSteps = action.payload;
      state.steps = action.payload;
    },
    searchSteps: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      filterSteps(state);
    },
    removeStep: (state, action: PayloadAction<number>) => {
      state.allSteps = state.allSteps.filter(
        (step) => step.id != action.payload
      );
      filterSteps(state);
    },
    editStep: (state, action: PayloadAction<ProjectStep>) => {
      const step = state.allSteps.find((step) => step.id === action.payload.id);
      step!.name = action.payload.name;
      step!.description = action.payload.description;
      step!.attack = action.payload.attack;
      step!.updatedAt = dayjs().format("D MMM HH:mm");
      filterSteps(state);
    },
    addStep: (state, action: PayloadAction<ProjectStep>) => {
      const nanoid = customAlphabet("0123456789", 10);
      state.allSteps.push({
        id: Number(nanoid()),
        name: action.payload.name,
        description: action.payload.description,
        createdAt: dayjs().format("D MMM"),
        updatedAt: dayjs().format("D MMM HH:mm"),
        attack: action.payload.attack,
        ip: action.payload.ip,
      });
      filterSteps(state);
    },
  },
  selectors: {
    getStepsState: (state) => state,
  },
});

export const { setSteps, searchSteps, removeStep, editStep, addStep } =
  stepsSlice.actions;
export const { getStepsState } = stepsSlice.selectors;
export default stepsSlice.reducer;
