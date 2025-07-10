import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/store";
import { getProjectsState } from "../../services/slices/projectsSlice";
import { Button, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { StepsTable } from "../../components/steps-table/steps-table";
import styles from "./project-info.module.css";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  getStepsState,
  searchSteps,
  setSteps,
} from "../../services/slices/stepsSlice";
import { SidePanel } from "../../components/side-panel/side-panel";

export const ProjectInfo = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const project = useSelector(getProjectsState).allProjects.find(
    (project) => project.id === Number(id)
  );
  const steps = useSelector(getStepsState).steps;

  useEffect(() => {
    dispatch(setSteps(project!.steps));
  }, []);

  const searchStepsInTable = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchSteps(event.target.value));
  };

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
          onChange={searchStepsInTable}
        />
        <Button
          variant="outlined"
          size="large"
          startIcon={<AddIcon />}
          disabled={steps.length == 5}
          onClick={() => setIsOpen(true)}
        >
          Add step
        </Button>
        {isOpen && (
          <SidePanel
            open={true}
            onClose={() => setIsOpen(false)}
            title="Добавление шагов"
            buttonText="Добавить"
            steps={steps}
            selectedStepId={null}
          />
        )}
      </div>
      <StepsTable steps={steps} />
    </main>
  );
};
