import { Button } from "react-bootstrap";
import AddCategoryButton from "../AddCategoryButton/AddCategoryButton";
import styles from "./NavBar.module.css";
import CategoryButton from "../CategoryButton/CategoryButton";
import { useNavigate } from "react-router-dom";

const NavBar = ({ categories, fetchCategories }) => {
  const navigate = useNavigate();
  console.log(window.location);

  return (
      <div className={styles.navBarContainer}>
        <Button variant={window.location.href.includes('main') ? "warning" : "primary"} onClick={() => navigate("/main")}>
          Main
        </Button>
        {categories.length > 0 &&
          categories.map((item, index) => (
            <CategoryButton
              name={item.category_name}
              key={index}
              path={`/${item.category_name.toLowerCase()}`}
              selected={window.location.href.includes(item.category_name)}
            />
          ))}
        {categories.length < 9 && localStorage.getItem("token") && (
          <AddCategoryButton fetchCategories={fetchCategories} />
        )}
      </div>
  );
};

export default NavBar;
