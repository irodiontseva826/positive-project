type TProjectStep = {
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
  steps: TProjectStep[];
};

export type TStatus = "" | "active" | "archive";

export type TProject = {
  id: number;
  name: string;
  description: string;
  status: TStatus;
  template: TemplateShort;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  lastRun: string; // ISO
  steps?: TProjectStep[];
};
