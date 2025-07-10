import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { ProjectStep } from "../../utils/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./steps-table.module.css";
import { useState } from "react";
import { SidePanel } from "../side-panel/side-panel";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { useDispatch } from "../../services/store";
import { removeStep } from "../../services/slices/stepsSlice";

type StepsTableProps = {
  steps: ProjectStep[];
};

export const StepsTable = ({ steps }: StepsTableProps) => {
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const dispatch = useDispatch();

  const deleteStepFromTable = () => {
    dispatch(removeStep(selectedStepId!!));
    setSelectedStepId(null);
  };

  const clickEditButton = (id: number) => {
    setSelectedStepId(id);
    setIsDelete(false);
  };

  const clickDeleteButton = (id: number) => {
    setSelectedStepId(id);
    setIsDelete(true);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Step</TableCell>
            <TableCell>Attack</TableCell>
            <TableCell>Changed</TableCell>
            <TableCell>Create</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {steps.map((step) => (
            <TableRow key={step.id} hover className={styles.row}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>{step.name}</TableCell>
              <TableCell>{step.attack.name}</TableCell>
              <TableCell>{step.updatedAt}</TableCell>
              <TableCell>{step.createdAt}</TableCell>
              <TableCell>
                {
                  <div className={styles.row_actions}>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => clickEditButton(step.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => clickDeleteButton(step.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {selectedStepId !== null && isDelete && (
          <ConfirmModal
            open={true}
            onClose={() => setSelectedStepId(null)}
            confirmAction={deleteStepFromTable}
            actionText="Вы действительно хотите удалить этот шаг?"
          />
        )}
        {selectedStepId !== null && !isDelete && (
          <SidePanel
            open={true}
            onClose={() => setSelectedStepId(null)}
            title="Редактирование шагов"
            buttonText="Сохранить"
            steps={steps}
            selectedStepId={selectedStepId}
          />
        )}
      </Table>
    </TableContainer>
  );
};
