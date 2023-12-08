import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./AddCategoryButton.module.css";
import { postCategory } from "../../helpers/categoriesFunctions";
import { responseHandler } from "../../helpers/responseHandler";

const AddCategoryButton = ({ fetchCategories }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value.trim());
  };

  const saveCategory = async () => {
    const response = await postCategory(name);
    responseHandler(response);
    fetchCategories();
    setIsPressed(false);
    setName("");    
  };

  useEffect(() => {
    setIsDisabled(name.length === 0);
  }, [name]);

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
          <Button
            variant="primary"
            disabled={isDisabled}
            onClick={saveCategory}
          >
            Save
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setName("");
              setIsPressed(false);
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </>
  );
};

export default AddCategoryButton;
