import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export type TConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  confirmAction: () => void;
  actionText: string;
};

export const ConfirmModal = ({
  open,
  onClose,
  confirmAction,
  actionText,
}: TConfirmModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Подтверждение действия</DialogTitle>
      <DialogContent>
        <DialogContentText>{actionText}</DialogContentText>
        <DialogActions>
          <Button onClick={confirmAction} variant="contained">
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
