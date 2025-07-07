type ProjectStep = {
  id: number;
  name: string;
  description: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  lastRun: string; // ISO
};

type TemplateShort = {
  id: number;
  name: string;
};

type Template = {
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
  steps?: ProjectStep[];
};
