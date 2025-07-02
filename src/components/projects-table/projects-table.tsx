import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import { projects } from "../../utils/constants";
import { Link } from "react-router-dom";

export const ProjectsTable = () => {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow key={index}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
