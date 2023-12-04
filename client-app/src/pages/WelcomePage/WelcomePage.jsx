import { useEffect, useState } from "react";
import styles from "./WelcomePage.module.css";
import { getRestaurant, postRestaurant } from "../../helpers/restaurantFunctions";
import { responseHandler } from "../../helpers/responseHandler";

const WelcomePage = () => {
  const [restaurant, setRestaurant] = useState();
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
    setRestaurant(body);
  }

  useEffect(() => {
    fetchRestaurant();
    console.log(restaurant);
  }, []);

  const saveRestaurant = () => {
    postRestaurant(restaurantName, description);
  }

  return (
    <>
      {restaurant ? (
        <div>
          <div></div>
        </div>
      ) : (
        <div className={styles.welcomePageContainer}>
          <div className={styles.welcomeForm}>
            <div className={styles.contentContainer}>
              <div>Add your restaurant</div>
              <div>
                <label>Restaurant name:</label>
                <input
                  type="text"
                  value={restaurantName}
                  onChange={handleRestaurantNameChange}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <button onClick={saveRestaurant}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePage;
