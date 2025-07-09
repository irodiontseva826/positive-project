import { useParams } from "react-router-dom";
import { useSelector } from "../../services/store";
import { getProjectsState } from "../../services/slices/projectsSlice";
import { Button, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { StepsTable } from "../../components/steps-table/steps-table";
import styles from "./project-info.module.css";

export const ProjectInfo = () => {
  const id = useParams().id;
  const project = useSelector(getProjectsState).allProjects.find(
    (project) => project.id === Number(id)
  );
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Проект: {project!.name}</h1>
      <div className={styles.controls}>
        <Input
          placeholder="Search"
          size="medium"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          //onChange={searchProjectsInTable}
        />
        <Button
          variant="outlined"
          size="large"
          startIcon={<AddIcon />}
          disabled={project!.steps.length == 5}
          //onClick={() => setIsOpen(true)}
        >
          Add step
        </Button>
      </div>
      <StepsTable steps={project!.steps} />
    </main>
  );
};
