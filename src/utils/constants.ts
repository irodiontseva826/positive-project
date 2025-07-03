import type { TProject } from "./types";

export const projects: TProject[] = [
  {
    id: 1,
    name: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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
