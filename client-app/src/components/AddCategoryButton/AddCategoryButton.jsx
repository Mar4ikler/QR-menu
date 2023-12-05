import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./AddCategoryButton.module.css";

const AddCategoryButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      {!isPressed ? (
        <Button variant="primary" onClick={() => setIsPressed(true)}>
          +
        </Button>
      ) : (
        <div className={styles.formContainer}>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={handleNameChange}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={() => setIsPressed(false)}>
            Save
          </Button>
        </div>
      )}
    </>
  );
};

export default AddCategoryButton;
