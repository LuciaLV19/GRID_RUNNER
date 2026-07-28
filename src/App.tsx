import { Routes, Route } from "react-router-dom";
import Home from "./components/views/Home";
import ProjectView from "./components/views/ProjectView";
import Layout from "./components/layouts/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="project/:id" element={<ProjectView />} />
      </Route>
      <Route path="*" element={<div className="p-6">Ruta no encontrada</div>} />
    </Routes>
  );
}

export default App;
