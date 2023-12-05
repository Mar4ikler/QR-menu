import { useState } from "react";
import { getLogin } from "../../helpers/getLogin";
import { responseHandler } from "../../helpers/responseHandler";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

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
      navigate("/welcome");
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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" onChange={handleUsernameChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
