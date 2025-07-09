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
import { useState, type SyntheticEvent } from "react";
//import DeleteIcon from "@mui/icons-material/Delete";

type StepFormProps = {
  step: ProjectStep;
  index: number;
  isOpen: boolean;
};

export const StepForm = ({ step, index, isOpen }: StepFormProps) => {
  const [expanded, setExpanded] = useState<boolean>(isOpen);
  const toggleAccordion = (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
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
          value={step.name}
        />
        <TextField label="IP узла" fullWidth margin="normal" />

        <TextField
          select
          label="Тип атаки"
          fullWidth
          margin="normal"
          value={step.attack.name}
        >
          {attacks.map((attack) => (
            <MenuItem key={attack.id} value={attack.name}>
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
          value={step.description}
        />
      </AccordionDetails>
    </Accordion>
  );
};
