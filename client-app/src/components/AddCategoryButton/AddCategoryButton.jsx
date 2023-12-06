import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./AddCategoryButton.module.css";
import { postCategory } from "../../helpers/categoriesFunctions";

const AddCategoryButton = ({ fetchCategories }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const saveCategory = () => {
    postCategory(name).then(()=>fetchCategories());
    setIsPressed(false);
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
          <Button variant="primary" onClick={saveCategory}>
            Save
          </Button>
          <Button variant="danger" onClick={() => setIsPressed(false)}>
            Cancel
          </Button>
        </div>
      )}
    </>
  );
};

export default AddCategoryButton;
