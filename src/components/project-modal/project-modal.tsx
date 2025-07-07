import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./project-modal.module.css";
import { useState } from "react";
import type { Project } from "../../utils/types";

export type TProjectModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  projectAction: (project: Project) => void;
  project?: Project;
};

export const ProjectModal = ({
  open,
  onClose,
  title,
  buttonText,
  projectAction,
  project,
}: TProjectModalProps) => {
  const [updatedProject, setUpdatedProject] = useState<Project | undefined>(
    project
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle className={styles.header}>
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.content}>
        <TextField
          variant="filled"
          id="name"
          label="Название"
          value={updatedProject?.name ?? ""}
          onChange={(e) =>
            setUpdatedProject({
              ...updatedProject,
              name: e.target.value,
            } as Project)
          }
        />
        <TextField
          variant="filled"
          multiline
          rows={5}
          id="description"
          label="Описание"
          value={updatedProject?.description ?? ""}
          onChange={(e) =>
            setUpdatedProject({
              ...updatedProject,
              description: e.target.value,
            } as Project)
          }
        />
        <DialogActions>
          <Button
            onClick={() => projectAction(updatedProject as Project)}
            variant="contained"
            disabled={updatedProject?.name.trim() === "" || !updatedProject}
          >
            {buttonText}
          </Button>
          <Button onClick={onClose} variant="outlined">
            Отмена
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
