import type { Project } from "./types";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type ServerResponse<T> = {
  success: boolean;
} & T;

type ProjectsResponse = ServerResponse<{
  data: Project[];
}>;

export const getProjectsApi = () =>
  fetch(`/api/projects`, {
    headers: {
      'Cache-Control': 'no-cache',
    }})
    .then((res) => checkResponse<ProjectsResponse>(res))
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });