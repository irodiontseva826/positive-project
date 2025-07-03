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
import { useEffect, useState } from "react";

export type TProjectModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  projectAction: () => void;
  projectName?: string;
  projectDescription?: string;
};

export const ProjectModal = ({
  open,
  onClose,
  title,
  buttonText,
  projectAction,
  projectName,
  projectDescription,
}: TProjectModalProps) => {
  const [name, setName] = useState(projectName ?? "");
  const [description, setDescription] = useState(projectDescription ?? "");

  useEffect(() => {
    setName(projectName ?? "");
    setDescription(projectDescription ?? "");
  }, [projectName, projectDescription]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle className={styles.dialog__header}>
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.dialog__content}>
        <TextField
          variant="filled"
          id="name"
          label="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="filled"
          multiline
          rows={5}
          id="description"
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DialogActions>
          <Button onClick={projectAction} variant="contained">
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
