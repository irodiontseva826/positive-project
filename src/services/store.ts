import { combineSlices, configureStore } from "@reduxjs/toolkit";

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import projectsReducer from "./slices/projectsSlice";
import stepsReducer from "./slices/stepsSlice";

export const rootReducer = combineSlices({
  projects: projectsReducer,
  steps: stepsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
