export type Attack = {
  id: number;
  name: string;
};

export type ProjectStep = {
  id: number;
  name: string;
  description: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  attack: Attack;
};

type TemplateShort = {
  id: number;
  name: string;
};

export type Template = {
  id: number;
  name: string;
  description: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO,
  steps: ProjectStep[];
};

export type Status = "active" | "archive";
export type ProjectsStatus = Status | "all";

export type Project = {
  id: number;
  name: string;
  description: string;
  status: Status;
  template: TemplateShort;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  lastRun: string; // ISO
  steps: ProjectStep[];
};
