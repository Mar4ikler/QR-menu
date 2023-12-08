import { Button, Card } from "react-bootstrap";
import { deleteDish } from "../../helpers/dishesFunctions";
import UpdateDishButton from "../UpdateDishButton/UpdateDishButton";
import styles from "./DishForm.module.css";
import { responseHandler } from "../../helpers/responseHandler";

const DishForm = ({ dish, fetchDishes }) => {
  const handleDeleteDish = async () => {
    const response = await deleteDish(dish.dish_id);
    responseHandler(response);
    fetchDishes();
  };

  return (
    <div className={styles.dishContainer}>
      <Card style={{ width: "19rem" }}>
        <Card.Body>
          <Card.Title>{dish.dish_name}</Card.Title>
          <Card.Text>{dish.description}</Card.Text>
          <Card.Text>{dish.price}$</Card.Text>
          {localStorage.getItem("token") && (
            <div className={styles.funcButtons}>
              <UpdateDishButton dish={dish} fetchDishes={fetchDishes} />
              <div className={styles.deleteButton}>
                <Button variant="danger" onClick={handleDeleteDish}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default DishForm;
