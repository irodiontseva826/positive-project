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

type StepsTableProps = {
  steps: ProjectStep[];
};

export const StepsTable = ({ steps }: StepsTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Step</TableCell>
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
              <TableCell>{step.updatedAt}</TableCell>
              <TableCell>{step.createdAt}</TableCell>
              <TableCell>
                {
                  <div className={styles.row_actions}>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      //onClick={() => clickEditButton(project.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      //onClick={() => clickDeleteButton(project.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
