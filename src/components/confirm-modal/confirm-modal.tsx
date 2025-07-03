import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "../../services/store";
import { removeProject } from "../../services/slices/projectsSlice";

export type TConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  id: number;
};

export const ConfirmModal = ({ open, onClose, id }: TConfirmModalProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeProject(id));
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Подтверждение действия</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы действительно хотите удалить этот проект?
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClick} variant="contained">
            Да
          </Button>
          <Button onClick={onClose} variant="outlined">
            Нет
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
