import { useState } from "react";
import { getLogin } from "../../helpers/getLogin";
import { responseHandler } from "../../helpers/responseHandler";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    // if (!email || !validateEmail(email)) {
    //     setEmailError("Некорректный email");
    //     return;
    // }
    const response = await getLogin(username, password);
    const parseRes = await responseHandler(response);
    if (parseRes["token"]) {
      window.localStorage.setItem("token", parseRes["token"]);
      navigate('/welcome');
    } else {
      alert("Данный пользователь не существует");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginForm}>
        <div className={styles.contentContainer}>
          <div>Login</div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button onClick={handleLogin} className={styles.loginButton}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
