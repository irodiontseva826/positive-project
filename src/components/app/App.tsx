import { Routes, Route, Navigate } from "react-router-dom";
import Projects from "../../pages/projects/projects";
import { AppHeader } from "../app-header/app-header";
import { NotFound404 } from "../../pages/not-found-404/not-found-404";
import { ProjectInfo } from "../../pages/project-info/project-info";

const App = () => {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectInfo />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
};

export default App;
