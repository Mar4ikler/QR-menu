import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getCategories } from "../../helpers/categoriesFunctions";
import { responseHandler } from "../../helpers/responseHandler";
import AddCategoryButton from "../AddCategoryButton/AddCategoryButton";
import styles from "./NavBar.module.css";
import CategoryButton from "../CategoryButton/CategoryButton";

const NavBar = () => {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const response = await getCategories();
    const body = await responseHandler(response);
    setCategories(body);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <div className={styles.navBarContainer}>
      <Button variant="primary">Main</Button>
      {categories.length > 0 &&
        categories.map((item, index) => (
          <CategoryButton name={item.category_name} key={index}/>
        ))}
      <AddCategoryButton />
    </div>
  );
};

export default NavBar;
