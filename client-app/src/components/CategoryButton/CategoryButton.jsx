import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CategoryButton = ({ name, path, selected }) => {
  const navigate = useNavigate();

  return (
    <Button variant={selected ? "warning" : "primary"} onClick={() => navigate(path)}>
      {name}
    </Button>
  );
};

export default CategoryButton;
