import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import type { ProjectStep } from "../../utils/types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { attacks } from "../../utils/constants";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import isIP from "validator/lib/isIP";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { removeStep } from "../../services/slices/stepsSlice";
import { useDispatch } from "../../services/store";

type StepFormProps = {
  step?: ProjectStep;
  index: number;
  isOpen: boolean;
  onChange: (step: ProjectStep, index: number) => void;
};

export const StepForm = ({ step, index, isOpen, onChange }: StepFormProps) => {
  const [expanded, setExpanded] = useState<boolean>(isOpen);
  const [updatedStep, setUpdatedStep] = useState<ProjectStep | undefined>(
    step ?? {
      id: 0,
      name: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      attack: { id: 0, name: "" },
      ip: "",
    }
  );
  const [ipError, setIpError] = useState<string>("");
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const toggleAccordion = (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const updateStepState = (newStep: ProjectStep) => {
    setUpdatedStep(newStep);
    onChange(newStep, index);
  };

  const changeIP = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIpError(
      value && isIP(value, 4) ? "" : "Некорректный IP или поле пустое"
    );
    updateStepState({ ...updatedStep!, ip: value });
  };

  const deleteStepFromTable = () => {
    dispatch(removeStep(selectedStepId!));
    setSelectedStepId(null);
  };

  return (
    <Box display="flex" alignItems="flex-start" gap={2} mt={4}>
      <Accordion
        expanded={expanded}
        onChange={toggleAccordion}
        key={step?.id || `step-${index}`}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography variant="subtitle1" mt={4}>
            Шаг {index + 1}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Название"
            fullWidth
            margin="normal"
            value={updatedStep?.name ?? ""}
            onChange={(e) =>
              updateStepState({ ...updatedStep!, name: e.target.value })
            }
          />
          <TextField
            label="IP узла"
            fullWidth
            margin="normal"
            value={updatedStep?.ip ?? ""}
            onChange={changeIP}
            error={!!ipError}
            helperText={ipError}
          />

          <TextField
            select
            label="Тип атаки"
            fullWidth
            margin="normal"
            value={updatedStep?.attack?.id ?? ""}
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              const selectedAttack = attacks.find(
                (attack) => attack.id === selectedId
              );
              if (selectedAttack) {
                updateStepState({ ...updatedStep!, attack: selectedAttack });
              }
            }}
          >
            {attacks.map((attack) => (
              <MenuItem key={attack.id} value={attack.id}>
                {attack.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Заметки"
            fullWidth
            margin="normal"
            multiline
            minRows={3}
            value={updatedStep?.description ?? ""}
            onChange={(e) =>
              updateStepState({ ...updatedStep!, description: e.target.value })
            }
          />
        </AccordionDetails>
      </Accordion>

      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => setSelectedStepId(updatedStep!.id)}
        disabled={updatedStep?.id === 0}
      >
        <DeleteIcon />
      </IconButton>
      {selectedStepId !== null && (
        <ConfirmModal
          open={true}
          onClose={() => setSelectedStepId(null)}
          confirmAction={deleteStepFromTable}
          actionText="Вы действительно хотите удалить этот шаг?"
        />
      )}
    </Box>
  );
};
