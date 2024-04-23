import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import LaunchScreenPage from "./screens/LaunchScreenPage";
import ProjectPage from "./screens/ProjectPage";
import AllChecklistsPage from "./screens/AllChecklistsPage";
import SummaryChecklistPage from "./screens/SummaryChecklistPage";
import TemplateLogPage from "./screens/TemplateLogPage";
import CreateProjectPage from "./screens/CreateProjectPage";
import TemplateManagementPage from "./screens/TemplateManagementPage";
import Checklist from "./screens/Checklist";
import TemplateEditorPage from "./screens/TemplateEditorPage";
import ChecklistLogPage from "./screens/ChecklistLogPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" Component={LaunchScreenPage} />
            <Route path="/project/:id" Component={ProjectPage} />
            <Route path="/summary/:id" Component={SummaryChecklistPage} />
            <Route path="/group/:id" Component={AllChecklistsPage} />
            <Route path="/template-log/:id" Component={TemplateLogPage} />
            <Route path="/create-project" Component={CreateProjectPage} />
            <Route
              path="/template-manage/:id"
              Component={TemplateManagementPage}
            />
            <Route path="/checklist/:name" Component={Checklist} />
            <Route
              path="/template-editor/:name"
              Component={TemplateEditorPage}
            />
            <Route path="/checklist-log/:name" Component={ChecklistLogPage} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
