import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { updateCategory } from "../../helpers/categoriesFunctions";
import { useNavigate } from "react-router-dom";
import styles from './UpdateCategoryButton.module.css';
import { responseHandler } from "../../helpers/responseHandler";

const UpdateCategoryButton = ({ fetchCategories, category }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState(category.category_name);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value.trim());
  };

  const handleUpdateCategory = async () => {
    const response = await updateCategory(category.category_id, name);
    responseHandler(response);
    fetchCategories();
    navigate("/main");
    setIsPressed(false);
    setName("");
  };

  useEffect(() => {
    setIsDisabled(name.length === 0);
  }, [name]);

  return (
    <>
      {!isPressed ? (
        <Button variant="info" onClick={() => setIsPressed(true)}>
          Edit category
        </Button>
      ) : (
        <div>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="New name"
                onChange={handleNameChange}
                defaultValue={category.category_name}
              />
            </Form.Group>
          </Form>
          <div className={styles.funcButtons}>
          <Button
            variant="primary"
            disabled={isDisabled}
            onClick={handleUpdateCategory}
          >
            Save
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setIsPressed(false);
              setName(category.category_name);
            }}
          >
            Cancel
          </Button>
          </div>
          
        </div>
      )}
    </>
  );
};

export default UpdateCategoryButton;
