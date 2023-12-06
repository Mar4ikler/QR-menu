import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { updateCategory } from "../../helpers/categoriesFunctions";
import { useNavigate } from "react-router-dom";

const UpdateCategoryButton = ({ fetchCategories, categoryId }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUpdateCategory = () => {
    updateCategory(categoryId, name).then(() => {
      fetchCategories();
      navigate("/main");
    });
    setIsPressed(false);
  };

  return (
    <>
      {!isPressed ? (
        <Button variant="info" onClick={() => setIsPressed(true)}>
          Update
        </Button>
      ) : (
        <div>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="New name"
                onChange={handleNameChange}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleUpdateCategory}>
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

export default UpdateCategoryButton;
