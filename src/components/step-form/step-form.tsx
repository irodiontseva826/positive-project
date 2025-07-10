import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import type { ProjectStep } from "../../utils/types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { attacks } from "../../utils/constants";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
//import DeleteIcon from "@mui/icons-material/Delete";
import isIP from "validator/lib/isIP";

type StepFormProps = {
  step?: ProjectStep;
  index: number;
  isOpen: boolean;
  onChange: (step: ProjectStep, index: number) => void;
};

export const StepForm = ({ step, index, isOpen, onChange }: StepFormProps) => {
  const [expanded, setExpanded] = useState<boolean>(isOpen);
  const [updatedStep, setUpdatedStep] = useState<ProjectStep | undefined>(step);
  const [ip, setIp] = useState(step?.ip ?? "");
  const [ipError, setIpError] = useState<string>("");

  const toggleAccordion = (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const changeIP = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIp(value);

    if (!isIP(value, 4)) {
      setIpError("Некорректный IP");
    } else {
      setIpError("");
      setNewStep({ ...updatedStep!, ip: value });
    }
  };

  const setNewStep = (newStep: ProjectStep) => {
    setUpdatedStep(newStep);
    onChange(newStep, index);
  };

  return (
    <Accordion expanded={expanded} onChange={toggleAccordion}>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography variant="subtitle1" mt={4}>
          Шаг {index + 1}
        </Typography>
        {/*
              <IconButton
                aria-label="delete"
                size="small"
                onClick={(e) => {
                  e.stopPropagation()}}
              >
                <DeleteIcon />
              </IconButton>*/}
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Название"
          fullWidth
          margin="normal"
          value={updatedStep?.name ?? ""}
          onChange={(e) =>
            setNewStep({ ...updatedStep!, name: e.target.value })
          }
        />
        <TextField
          label="IP узла"
          fullWidth
          margin="normal"
          value={ip}
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
              setNewStep({ ...updatedStep!, attack: selectedAttack });
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
            setNewStep({ ...updatedStep!, description: e.target.value })
          }
        />
      </AccordionDetails>
    </Accordion>
  );
};
