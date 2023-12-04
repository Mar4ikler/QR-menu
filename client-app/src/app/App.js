import { useEffect, useState } from "react";
import { getUser } from "../helpers/getUser";
import { responseHandler } from "../helpers/responseHandler";
import LoginPage from "../pages/LoginPage/LoginPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // const [user, setUser] = useState(null);

  // async function fetchData() {
  //   const response = await getUser();
  //   const body = await responseHandler(response);
  //   setUser(body);
  // }

  // useEffect(() => {
  //   if (!user && window.localStorage.getItem("token")) {
  //     fetchData();
  //   }
  // }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<WelcomePage />} path="/welcome" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
