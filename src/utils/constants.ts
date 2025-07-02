import type { TProject } from "./types";

export const projects: TProject[] = [
  {
    id: 1,
    name: "Project 1",
    description: "",
    status: "archive",
    template: {
      id: 1,
      name: "Template 1",
    },
    createdAt: "15 мая",
    updatedAt: "Сегодня, 14:12",
    lastRun: "20 мая",
  },
  {
    id: 2,
    name: "Project 2",
    description: "",
    status: "active",
    template: {
      id: 1,
      name: "Template 2",
    },
    createdAt: "15 мая",
    updatedAt: "Сегодня, 14:12",
    lastRun: "20 мая",
  },
  {
    id: 3,
    name: "Project 3",
    description: "",
    status: "active",
    template: {
      id: 1,
      name: "Template 1",
    },
    createdAt: "15 мая",
    updatedAt: "Сегодня, 14:12",
    lastRun: "20 мая",
  },
];
