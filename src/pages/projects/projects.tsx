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
  filterProjectsByStatus,
  searchProjects,
  setProjects,
} from "../../services/slices/projectsSlice";
import type { TProjectsStatus } from "../../utils/types";
import { useEffect, useState, type ChangeEvent } from "react";

const Projects = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<TProjectsStatus>("all");

  useEffect(() => {
    dispatch(setProjects());
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProjects(event.target.value));
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
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
            onChange={handleSearch}
          />
          <FormControl fullWidth>
            <InputLabel id="select-label">Status</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              label="Status"
              value={status}
              onChange={handleChangeSelect}
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
          <Button variant="outlined" size="large" startIcon={<AddIcon />}>
            Create
          </Button>
        </div>
        <ProjectsTable />
      </main>
    </>
  );
};

export default Projects;
