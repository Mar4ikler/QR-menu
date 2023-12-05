import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CategoryButton = ({ name, path }) => {
  const navigate = useNavigate();

  return (
    <Button variant="primary" onClick={() => navigate(path)}>
      {name}
    </Button>
  );
};

export default CategoryButton;
