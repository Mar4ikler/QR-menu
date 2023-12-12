import { useEffect, useState } from "react";
import styles from "./WelcomePage.module.css";
import {
  getRestaurant,
  postRestaurant,
} from "../../helpers/restaurantFunctions";
import { responseHandler } from "../../helpers/responseHandler";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WelcomePage = ({ fetchCategories }) => {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [ip, setIp] = useState(window.location.hostname.split('.').slice(0,3).join('.'));

  const handleRestaurantNameChange = (event) => {
    setRestaurantName(event.target.value.trim());
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value.trim());
  };

  const handleIpChange = (event) => {
    setIp(event.target.value.trim());
  };

  async function fetchRestaurant() {
    const response = await getRestaurant();
    const body = responseHandler(response);
    return body;
  }

  useEffect(() => {
    fetchRestaurant().then((data) => {
      if (data?.restaurant_id) {
        fetchCategories();
        navigate("/main");
      }
    });
  }, []);

  const saveRestaurant = () => {
    postRestaurant(restaurantName, description, ip);
    fetchRestaurant().then((data) => {
      if (data) {
        fetchCategories();
        navigate("/main");
      }
    });
  };

  useEffect(() => {
    setIsDisabled(
      restaurantName.length === 0 || description.length === 0 || ip.length === 0
    );
  }, [restaurantName, description, ip]);

  return (
    <>
      <div className={styles.welcomePageContainer}>
        <div className={styles.welcomeForm}>
          <div className={styles.contentContainer}>
            <div>Add your restaurant</div>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Restaurant name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Restaurant name"
                  onChange={handleRestaurantNameChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>IP-address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="IP-address"
                  onChange={handleIpChange}
                  defaultValue={ip} 
                />
              </Form.Group>
            </Form>
            <Button
              variant="primary"
              disabled={isDisabled}
              onClick={saveRestaurant}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
