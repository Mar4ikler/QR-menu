import LoginPage from "../pages/LoginPage/LoginPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout/Layout";
import MainView from "../views/MainView/MainView";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<WelcomePage />} path="/welcome" />
          <Route element={<Layout />} path="/">
            <Route index element={<Navigate to="/main" />} />
            <Route element={<MainView />} path="main" />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
