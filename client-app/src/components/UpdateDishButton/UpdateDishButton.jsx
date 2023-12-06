import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { updateDish } from "../../helpers/dishesFunctions";

const UpdateDishButton = ({ dishId, fetchDishes }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleUpdateDish = () => {
    updateDish(dishId, name, description, price).then(() => fetchDishes());
    setIsPressed(false);
  };

  return (
    <>
      {!isPressed ? (
        <Button variant="info" onClick={() => setIsPressed(true)}>
          Edit
        </Button>
      ) : (
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="New name"
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleDescriptionChange}
                placeholder="New description"
              />
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="number"
              placeholder="New price"
              onChange={handlePriceChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleUpdateDish}>
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

export default UpdateDishButton;
