import { Routes, Route } from "react-router-dom";
import Projects from "../../pages/projects/projects";
import { AppHeader } from "../app-header/app-header";

const App = () => {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
};

export default App;
