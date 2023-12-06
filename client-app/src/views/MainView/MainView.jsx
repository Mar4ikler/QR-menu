import { useEffect, useState } from "react";
import styles from "./MainView.module.css";
import { getRestaurant } from "../../helpers/restaurantFunctions";
import { responseHandler } from "../../helpers/responseHandler";
import { Card } from "react-bootstrap";

const MainView = () => {
  const [restaurant, setRestaurant] = useState({});

  async function fetchRestaurant() {
    const response = await getRestaurant();
    const body = await responseHandler(response);
    setRestaurant(body);
  }

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <div className={styles.mainViewContainer}>
      <div className={styles.cardContainer}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{restaurant?.restaurant_name}</Card.Title>
          <Card.Text>{restaurant?.description}</Card.Text>
        </Card.Body>
      </Card>
      </div>  
    </div>
  );
};

export default MainView;
