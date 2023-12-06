import { Button } from "react-bootstrap";
import AddCategoryButton from "../AddCategoryButton/AddCategoryButton";
import styles from "./NavBar.module.css";
import CategoryButton from "../CategoryButton/CategoryButton";
import { useNavigate } from "react-router-dom";

const NavBar = ({ categories, fetchCategories }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.navBarContainer}>
      <Button variant="primary" onClick={() => navigate("/main")}>
        Main
      </Button>
      {categories.length > 0 &&
        categories.map((item, index) => (
          <CategoryButton
            name={item.category_name}
            key={index}
            path={`/${item.category_name.toLowerCase()}`}
          />
        ))}
      {categories.length < 9 && (
        <AddCategoryButton fetchCategories={fetchCategories} />
      )}
    </div>
  );
};

export default NavBar;