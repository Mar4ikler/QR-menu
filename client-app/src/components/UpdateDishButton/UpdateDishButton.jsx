import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { updateDish } from "../../helpers/dishesFunctions";
import styles from "./UpdateDishButton.module.css";
import { responseHandler } from "../../helpers/responseHandler";

const UpdateDishButton = ({ dish, fetchDishes }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState(dish.dish_name);
  const [description, setDescription] = useState(dish.description);
  const [price, setPrice] = useState(dish.price);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value.trim());
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value.trim());
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value <= 0 ? 0 : event.target.value);
  };

  const handleUpdateDish = async () => {
    const response = await updateDish(dish.dish_id, name, description, price);
    responseHandler(response);
    fetchDishes();
    setIsPressed(false);
    setName(dish.dish_name);
    setDescription(dish.description);
    setPrice(dish.price);
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
                defaultValue={dish.dish_name}
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
                defaultValue={dish.description}
              />
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="number"
              placeholder="New price"
              onChange={handlePriceChange}
              min={0}
              // value={price}
              defaultValue={dish.price}
            />
          </Form.Group>
          <div className={styles.funcButtons}>
            <Button
              variant="primary"
              disabled={isDisabled}
              onClick={handleUpdateDish}
            >
              Save
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setIsPressed(false);
                setName(dish.dish_name);
                setDescription(dish.description);
                setPrice(dish.price);
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

export default UpdateDishButton;
