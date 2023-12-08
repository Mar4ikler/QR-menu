import { useEffect, useState } from "react";
import styles from "./MainView.module.css";
import { getRestaurant } from "../../helpers/restaurantFunctions";
import { responseHandler } from "../../helpers/responseHandler";
import { Card } from "react-bootstrap";
import QRGenerateButton from "../../components/QRGenerateButton/QRGenerateButton";
import UpdateRestaurantButton from "../../components/UpdateRestaurantButton/UpdateRestaurantButton";

const MainView = ({ fetchCategories }) => {
  const [restaurant, setRestaurant] = useState({});

  async function fetchRestaurant() {
    const response = await getRestaurant();
    const body = await responseHandler(response);
    setRestaurant(body);
    return body;
  }

  // useEffect(() => {
  //   fetchRestaurant();
  // }, []);

  useEffect(() => {
    fetchRestaurant().then((data) => {
      if (data) {
        fetchCategories();
      }
    });
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
      {localStorage.getItem("token") && (
        <div className={styles.mainButtons}>
          <div className={styles.updateButton}>
            <UpdateRestaurantButton
              restaurant={restaurant}
              fetchRestaurant={fetchRestaurant}
            />
          </div>
          <div className={styles.qrButton}>
            <QRGenerateButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainView;
