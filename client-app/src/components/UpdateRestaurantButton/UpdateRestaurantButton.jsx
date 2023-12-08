import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./UpdateRestaurantButton.module.css";
import { updateRestaurant } from "../../helpers/restaurantFunctions";
import { responseHandler } from "../../helpers/responseHandler";

const UpdateRestaurantButton = ({ restaurant, fetchRestaurant }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [name, setName] = useState(restaurant?.restaurant_name);
  const [description, setDescription] = useState(restaurant?.description);
  const [ip, setIp] = useState(restaurant?.ip);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value.trim());
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value.trim());
  };

  const handleIpChange = (event) => {
    setIp(event.target.value.trim());
  };

  const handleUpdateDish = async () => {
    const response = await updateRestaurant(name, description, ip);
    responseHandler(response);
    fetchRestaurant();
    setIsPressed(false);
    setName(restaurant.restaurant_name);
    setDescription(restaurant.description);
    setIp(restaurant.ip);
  };

  useEffect(() => {
    setIsDisabled(
      name?.length === 0 || description?.length === 0 || ip?.length === 0
    );
  }, [name, description, ip]);

  return (
    <>
      {!isPressed ? (
        <Button variant="info" onClick={() => setIsPressed(true)}>
          Edit restaurant info
        </Button>
      ) : (
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="New name"
                onChange={handleNameChange}
                defaultValue={restaurant.restaurant_name}
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
                defaultValue={restaurant.description}
              />
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="New ip"
              onChange={handleIpChange}
              defaultValue={restaurant.ip}
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
                setName(restaurant.restaurant_name);
                setDescription(restaurant.description);
                setIp(restaurant.ip);
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

export default UpdateRestaurantButton;
