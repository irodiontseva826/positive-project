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
import { useSelector, useDispatch } from "../../services/store";
import {
  editProject,
  getProjectsState,
  removeProject,
} from "../../services/slices/projectsSlice";
import { useState } from "react";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import styles from "./projects-table.module.css";
import { ProjectModal } from "../project-modal/project-modal";

export const ProjectsTable = () => {
  const projects = useSelector(getProjectsState).projects;
  const dispatch = useDispatch();
  const [modalProjectId, setModalProjectId] = useState<number | null>(null);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const selectedProject = projects.find(
    (project) => project.id === modalProjectId
  );

  const deleteProjectFromTable = () => {
    dispatch(removeProject(modalProjectId!!));
    setModalProjectId(null);
  };

  const clickEditButton = (id: number) => {
    setModalProjectId(id);
    setIsDelete(false);
  };

  const clickDeleteButton = (id: number) => {
    setModalProjectId(id);
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
            <TableRow key={project.id} hover className={styles.row}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </TableCell>
              <TableCell>{project.template.name}</TableCell>
              <TableCell>{project.updatedAt}</TableCell>
              <TableCell>{project.createdAt}</TableCell>
              <TableCell>{project.lastRun}</TableCell>
              <TableCell>
                {
                  <div className={styles.row_actions}>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => clickEditButton(project.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => clickDeleteButton(project.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {modalProjectId !== null && isDelete && (
          <ConfirmModal
            open={true}
            onClose={() => setModalProjectId(null)}
            confirmAction={deleteProjectFromTable}
            actionText="Вы действительно хотите удалить этот проект"
          />
        )}
        {modalProjectId !== null && !isDelete && (
          <ProjectModal
            open={true}
            onClose={() => setModalProjectId(null)}
            title="Редактирование проекта"
            buttonText="Сохранить"
            projectAction={(updatedProject) => {
              dispatch(editProject(updatedProject));
              setModalProjectId(null);
            }}
            project={selectedProject!}
          />
        )}
      </Table>
    </TableContainer>
  );
};
