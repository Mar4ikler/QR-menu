import { Button, Card } from "react-bootstrap";
import { deleteDish } from "../../helpers/dishesFunctions";
import UpdateDishButton from "../UpdateDishButton/UpdateDishButton";

const DishForm = ({ dish, fetchDishes }) => {
  const handleDeleteDish = () => {
    deleteDish(dish.dish_id).then(() => fetchDishes());
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{dish.dish_name}</Card.Title>
        <Card.Text>{dish.description}</Card.Text>
        <Card.Text>{dish.price}$</Card.Text>
        <UpdateDishButton dishId={dish.dish_id} fetchDishes={fetchDishes}/>
        <Button variant="danger" onClick={handleDeleteDish}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DishForm;
