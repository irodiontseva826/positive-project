import type { Attack, Project } from "./types";
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

export const attacks: Attack[] = [
  { id: 1, name: "DDos" },
  { id: 2, name: "Phishing" },
  { id: 3, name: "Brute-force" },
  { id: 4, name: "MITM" },
  { id: 5, name: "XSS" },
  { id: 6, name: "SQL-injection" },
];

export const projects: Project[] = [
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
    createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
    updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
    lastRun: dayjs("2025-05-20 15:00").format("D MMM"),
    steps: [
      {
        id: 1,
        name: "Step 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[0],
        ip: "192.168.1.1",
      },
      {
        id: 2,
        name: "Step 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[1],
        ip: "192.168.10.14",
      },
      {
        id: 3,
        name: "Step 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[2],
        ip: "192.168.4.7",
      },
    ],
  },
  {
    id: 2,
    name: "Project 2",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    status: "active",
    template: {
      id: 2,
      name: "Template 2",
    },
    createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
    updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
    lastRun: dayjs("2025-05-20 15:00").format("D MMM"),
    steps: [
      {
        id: 1,
        name: "Step 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[3],
        ip: "192.168.1.1",
      },
      {
        id: 2,
        name: "Step 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[4],
        ip: "192.168.12.13",
      },
      {
        id: 3,
        name: "Step 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[5],
        ip: "192.168.9.1",
      },
      {
        id: 4,
        name: "Step 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[5],
        ip: "192.168.1.19",
      },
    ],
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
    createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
    updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
    lastRun: dayjs("2025-05-20 15:00").format("D MMM"),
    steps: [
      {
        id: 1,
        name: "Step 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[0],
        ip: "192.168.1.1",
      },
      {
        id: 2,
        name: "Step 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[1],
        ip: "192.168.10.1",
      },
      {
        id: 3,
        name: "Step 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[2],
        ip: "192.168.1.11",
      },
      {
        id: 4,
        name: "Step 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[2],
        ip: "192.168.15.1",
      },
      {
        id: 5,
        name: "Step 5",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        createdAt: dayjs("2025-05-15 15:00").format("D MMM"),
        updatedAt: dayjs("2025-05-17 14:12").format("D MMM HH:mm"),
        attack: attacks[2],
        ip: "192.168.18.12",
      },
    ],
  },
];
