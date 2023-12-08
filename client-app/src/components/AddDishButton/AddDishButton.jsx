import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { postDish } from "../../helpers/dishesFunctions";
import styles from "./AddDishButton.module.css";
import { responseHandler } from "../../helpers/responseHandler";

const AddDishButton = ({ categoryId, fetchDishes }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value.trim());
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value.trim());
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value < 0 ? 0 : event.target.value);
  };

  const saveDish = async () => {
    const response = await postDish(name, description, price, categoryId);
    responseHandler(response);
    fetchDishes();
    setIsPressed(false);
    setName("");
    setDescription("");
    setPrice(0);
  };

  useEffect(() => {
    setIsDisabled(
      name.length === 0 ||
        description.length === 0 ||
        price === 0 ||
        price.length === 0
    );
  }, [name, description, price]);

  return (
    <>
      {!isPressed ? (
        <Button variant="primary" onClick={() => setIsPressed(true)}>
          Add dish
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
              min={0}
              value={price}
              onChange={handlePriceChange}
            />
          </Form.Group>
          <div className={styles.funcButtons}>
            <Button variant="primary" disabled={isDisabled} onClick={saveDish}>
              Save
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setName("");
                setDescription("");
                setPrice(0);
                setIsPressed(false);
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

export default AddDishButton;
