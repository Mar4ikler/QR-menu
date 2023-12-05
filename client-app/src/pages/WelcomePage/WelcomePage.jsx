import { useEffect, useState } from "react";
import styles from "./WelcomePage.module.css";
import {
  getRestaurant,
  postRestaurant,
} from "../../helpers/restaurantFunctions";
import { responseHandler } from "../../helpers/responseHandler";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");

  const handleRestaurantNameChange = (event) => {
    setRestaurantName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  async function fetchRestaurant() {
    const response = await getRestaurant();
    const body = await responseHandler(response);
    return body;
  }

  useEffect(() => {
    fetchRestaurant().then((data)=>{
      if(data) navigate('/');
    });
  }, [navigate]);

  const saveRestaurant = () => {
    postRestaurant(restaurantName, description);
  };

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
              </Form>
              <Button variant="primary" onClick={saveRestaurant}>
                Save
              </Button>
            </div>
          </div>
        </div>
    </>
  );
};

export default WelcomePage;
