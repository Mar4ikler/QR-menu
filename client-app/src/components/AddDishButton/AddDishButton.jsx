import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { postDish } from "../../helpers/dishesFunctions";

const AddDishButton = ({ categoryId, fetchDishes }) => {
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

  const saveDish = () => {
    postDish(name, description, price, categoryId).then(() => fetchDishes());
    setIsPressed(false);
  };

  return (
    <>
      {!isPressed ? (
        <Button variant="primary" onClick={() => setIsPressed(true)}>
          +
        </Button>
      ) : (
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Name"
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
                placeholder="Description"
              />
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="number"
              placeholder="Price"
              onChange={handlePriceChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveDish}>
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

export default AddDishButton;
