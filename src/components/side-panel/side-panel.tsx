import { Box, Button, Drawer, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { ProjectStep } from "../../utils/types";
import { StepForm } from "../step-form/step-form";

type StepsDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  steps: ProjectStep[];
  selectedStepId: number;
};

export const SidePanel = ({
  open,
  onClose,
  title,
  buttonText,
  steps,
  selectedStepId,
}: StepsDrawerProps) => {
  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box sx={{ width: 600, padding: 4 }}>
        <Typography variant="h6" mb={4}>
          {title}
        </Typography>
        {steps.map((step, index) => (
          <StepForm
            step={step}
            index={index}
            isOpen={step.id == selectedStepId}
          />
        ))}
        {steps.length < 5 && (
          <Button variant="text" fullWidth startIcon={<AddIcon />}>
            Добавить шаг
          </Button>
        )}
        <Box display="flex" justifyContent="flex-start" gap={2} mt={4}>
          <Button variant="contained">{buttonText}</Button>
          <Button variant="outlined" onClick={onClose}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
