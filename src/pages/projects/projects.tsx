import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  type SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./projects.module.css";
import { ProjectsTable } from "../../components/projects-table/projects-table";
import { useDispatch } from "../../services/store";
import {
  addProject,
  filterProjectsByStatus,
  searchProjects,
  setProjects,
} from "../../services/slices/projectsSlice";
import type { TProjectsStatus } from "../../utils/types";
import { useEffect, useState, type ChangeEvent } from "react";
import { ProjectModal } from "../../components/project-modal/project-modal";

const Projects = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<TProjectsStatus>("all");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setProjects());
  }, []);

  const searchProjectsInTable = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProjects(event.target.value));
  };

  const changeSelect = (event: SelectChangeEvent) => {
    const newStatus = event.target.value as TProjectsStatus;
    setStatus(newStatus);
    dispatch(filterProjectsByStatus(newStatus));
  };

  return (
    <>
      <main className={styles.main}>
        <h1>Список проектов</h1>
        <div className={styles.controls}>
          <Input
            placeholder="Search"
            size="medium"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={searchProjectsInTable}
          />
          <FormControl fullWidth>
            <InputLabel id="select-label">Status</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              label="Status"
              value={status}
              onChange={changeSelect}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="archive">Archive</MenuItem>
            </Select>
          </FormControl>
          <ToggleButtonGroup>
            <ToggleButton value="list">List</ToggleButton>
            <ToggleButton value="graph">Graph</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="outlined"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setIsOpen(true)}
          >
            Create
          </Button>
          {isOpen && (
            <ProjectModal
              open={true}
              onClose={() => setIsOpen(false)}
              title="Добавление проекта"
              buttonText="Добавить"
              projectAction={({ id, name, description }) => {
                dispatch(addProject({ id, name, description }));
                setIsOpen(false);
              }}
              projectId={0}
            />
          )}
        </div>
        <ProjectsTable />
      </main>
    </>
  );
};

export default Projects;
