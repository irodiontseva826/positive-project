import { Box, Button, Drawer, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { ProjectStep } from "../../utils/types";
import { StepForm } from "../step-form/step-form";
import { useEffect, useState } from "react";
import { useDispatch } from "../../services/store";
import { addStep, editStep } from "../../services/slices/stepsSlice";

type StepsDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  steps: ProjectStep[];
  selectedStepId: number | null;
};

export const SidePanel = ({
  open,
  onClose,
  title,
  buttonText,
  steps,
  selectedStepId,
}: StepsDrawerProps) => {
  const dispatch = useDispatch();
  const [newFormsCount, setNewFormsCount] = useState<number>(0);
  const [newSteps, setNewSteps] = useState<ProjectStep[]>([]);

  useEffect(() => {
    if (open) {
      setNewSteps(steps);
      if (!selectedStepId) {
        setNewFormsCount(1);
      } else {
        setNewFormsCount(0);
      }
    }
  }, [open, selectedStepId, steps]);

  const changeStep = (updatedStep: ProjectStep, index: number) => {
    setNewSteps((prev) => {
      const newSteps = [...prev];
      newSteps[index] = updatedStep;
      return newSteps;
    });
  };

  const saveAll = () => {
    newSteps.forEach((step) => {
      if (step.id && steps.find((s) => s.id === step.id)) {
        dispatch(editStep(step));
      } else {
        dispatch(addStep(step));
      }
    });
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box sx={{ width: 600, padding: 4 }}>
        <Typography variant="h6" mb={4}>
          {title}
        </Typography>
        {newSteps.map((step, index) => (
          <StepForm
            step={step}
            index={index}
            isOpen={step.id == selectedStepId}
            onChange={changeStep}
          />
        ))}

        {Array.from({ length: newFormsCount }).map((_, i) => (
          <StepForm
            index={steps.length + i}
            isOpen={true}
            onChange={changeStep}
          />
        ))}
        {steps.length + newFormsCount < 5 && (
          <Button
            variant="text"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setNewFormsCount((prev) => prev + 1)}
          >
            Добавить шаг
          </Button>
        )}
        <Box display="flex" justifyContent="flex-start" gap={2} mt={4}>
          <Button variant="contained" onClick={saveAll}>
            {buttonText}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
