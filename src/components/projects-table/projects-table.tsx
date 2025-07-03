import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useSelector } from "../../services/store";
import { getProjectsState } from "../../services/slices/projectsSlice";
import { useState } from "react";
import { ConfirmModal } from "../confirm-modal/confirm-modal";

export const ProjectsTable = () => {
  const projects = useSelector(getProjectsState).projects;
  const [hoveredRowKey, setHoveredRowKey] = useState<number | null>(null);
  const [modalProjectId, setModalProjectId] = useState<number | null>(null);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Template</TableCell>
            <TableCell>Changed</TableCell>
            <TableCell>Create</TableCell>
            <TableCell>Last launch</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              hover
              onMouseOver={() => setHoveredRowKey(project.id)}
              onMouseOut={() => setHoveredRowKey(null)}
            >
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                <Link to="#">{project.name}</Link>
              </TableCell>
              <TableCell>{project.template.name}</TableCell>
              <TableCell>{project.updatedAt}</TableCell>
              <TableCell>{project.createdAt}</TableCell>
              <TableCell>{project.lastRun}</TableCell>
              <TableCell>
                {
                  <>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      style={{
                        visibility:
                          hoveredRowKey === project.id ? "visible" : "hidden",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      style={{
                        visibility:
                          hoveredRowKey === project.id ? "visible" : "hidden",
                      }}
                      onClick={() => setModalProjectId(project.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {modalProjectId !== null && (
          <ConfirmModal
            open={true}
            id={modalProjectId}
            onClose={() => setModalProjectId(null)}
          />
        )}
      </Table>
    </TableContainer>
  );
};
