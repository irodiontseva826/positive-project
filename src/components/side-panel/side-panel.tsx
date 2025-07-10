import { Box, Button, Drawer, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { ProjectStep } from "../../utils/types";
import { StepForm } from "../step-form/step-form";
import { useEffect, useState } from "react";
import { useDispatch } from "../../services/store";
import { addStep, editStep } from "../../services/slices/stepsSlice";
import isIP from "validator/lib/isIP";

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
  const [updatedSteps, setUpdatedSteps] = useState<ProjectStep[]>(steps);
  const [newSteps, setNewSteps] = useState<ProjectStep[]>([]);

  useEffect(() => {
    if (open) {
      setUpdatedSteps(steps);
      if (!selectedStepId) {
        setNewSteps([
          {
            id: 0,
            name: "",
            description: "",
            createdAt: "",
            updatedAt: "",
            attack: { id: 0, name: "" },
            ip: "",
          },
        ]);
      } else {
        setNewSteps([]);
      }
    } else {
      setNewSteps([]);
    }
  }, [open, selectedStepId, steps]);

  const addNewForm = () => {
    const newStep: ProjectStep = {
      id: 0,
      name: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      attack: { id: 0, name: "" },
      ip: "",
    };
    setNewSteps((prev) => [...prev, newStep]);
  };

  const updateStepsList = (updatedStep: ProjectStep, index: number) => {
    if (index < steps.length) {
      setUpdatedSteps((prev) => {
        const newSteps = [...prev];
        newSteps[index] = updatedStep;
        return newSteps;
      });
    } else {
      setNewSteps((prev) => {
        const newSteps = [...prev];
        newSteps[index - steps.length] = updatedStep;
        return newSteps;
      });
    }
  };

  const saveAll = () => {
    updatedSteps.forEach((step) => {
      if (step.id && steps.find((s) => s.id === step.id)) {
        dispatch(editStep(step));
      }
    });
    newSteps.forEach((step) => {
      dispatch(addStep(step));
    });
    onClose();
  };

  const isStepValid = (step: ProjectStep) => {
    return step.name.trim() !== "" && isIP(step.ip, 4) && step.attack.id !== 0;
  };

  const isSaveDisabled = () => {
    const allSteps = [...updatedSteps, ...newSteps];
    return allSteps.length === 0 || !allSteps.every(isStepValid);
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box sx={{ width: 600, padding: 4 }}>
        <Typography variant="h6" mb={4}>
          {title}
        </Typography>
        {updatedSteps.map((step, index) => (
          <StepForm
            key={step.id || `existing-${index}`}
            step={step}
            index={index}
            isOpen={step.id == selectedStepId}
            onChange={updateStepsList}
          />
        ))}
        {newSteps.map((step, index) => (
          <StepForm
            key={`new-${index}`}
            step={step}
            index={steps.length + index}
            isOpen={true}
            onChange={updateStepsList}
          />
        ))}
        {updatedSteps.length + newSteps.length < 5 && (
          <Button
            variant="text"
            fullWidth
            startIcon={<AddIcon />}
            onClick={addNewForm}
          >
            Добавить шаг
          </Button>
        )}
        <Box display="flex" justifyContent="flex-start" gap={2} mt={4}>
          <Button
            variant="contained"
            onClick={saveAll}
            disabled={isSaveDisabled()}
          >
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
