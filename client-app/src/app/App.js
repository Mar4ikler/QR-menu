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
import { useEffect, useState } from "react";
import { responseHandler } from "../helpers/responseHandler";
import { getCategories } from "../helpers/categoriesFunctions";
import CategoryView from "../components/CategoryView/CategoryView";

function App() {
  const [categories, setCategories] = useState([]);
  async function fetchCategories() {
    const response = await getCategories();
    const body = await responseHandler(response);
    setCategories(body);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<WelcomePage />} path="/welcome" />
          <Route
            element={
              <Layout
                categories={categories}
                fetchCategories={fetchCategories}
              />
            }
            path="/"
          >
            <Route index element={<Navigate to="/main" />} />
            <Route element={<MainView />} path="main" />
            {categories.length > 0 &&
              categories.map((item, index) => (
                <Route
                  key={index}
                  element={
                    <CategoryView
                      category={item}
                      fetchCategories={fetchCategories}
                    />
                  }
                  path={`/${item.category_name.toLowerCase()}`}
                />
              ))}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
