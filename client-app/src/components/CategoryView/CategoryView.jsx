import { Button } from "react-bootstrap";
import { deleteCategory } from "../../helpers/categoriesFunctions";
import { useNavigate } from "react-router-dom";
import UpdateCategoryButton from "../UpdateCategoryButton/UpdateCategoryButton";
import styles from "./CategoryView.module.css";
import { useEffect, useRef, useState } from "react";
import { getDishes } from "../../helpers/dishesFunctions";
import { responseHandler } from "../../helpers/responseHandler";
import DishForm from "../DishForm/DishForm";
import AddDishButton from "../AddDishButton/AddDishButton";
import SearchComponent from "../SearchComponent/SearchComponent";
import GeneralSelect from "../GeneralSelect/GeneralSelect";

const CategoryView = ({ category, fetchCategories }) => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const defaultDishes = useRef([]);
  const [searchValue, setSearchValue] = useState("");
  const [orderValue, setOrderValue] = useState("");

  const handleDeleteCategory = () => {
    deleteCategory(category.category_id).then(() => {
      fetchCategories();
      navigate("/main");
    });
  };

  async function fetchDishes() {
    const response = await getDishes(category.category_id, searchValue);
    const body = await responseHandler(response);
    setDishes(body);
    defaultDishes.current = body;
  }

  useEffect(() => {
    fetchDishes();
  }, [category, searchValue]);

  useEffect(() => {
    setDishes(sortDishes());
  }, [orderValue]);

  function compareByName(a, b) {
    const nameA = a.dish_name.toUpperCase();
    const nameB = b.dish_name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  function compareByPrice(a, b) {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    if (priceA < priceB) {
      return -1;
    }
    if (priceA > priceB) {
      return 1;
    }
    return 0;
  }

  const sortDishes = () => {
    let result = [...dishes];
    switch (orderValue) {
      case "1":
        result = result.sort(compareByPrice);
        break;
      case "2":
        result = result.sort(compareByPrice).reverse();
        break;
      case "3":
        result = result.sort(compareByName);
        break;
      case "4":
        result = result.sort(compareByName).reverse();
        break;
      default:
        result = defaultDishes.current;
        break;
    }
    return result;
  };

  return (
    <div className={styles.categoryViewContainer}>
      <div className={styles.contentContainer}>
        <SearchComponent
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <GeneralSelect orderValue={orderValue} setOrderValue={setOrderValue} />
        {dishes.length > 0 &&
          dishes.map((item, index) => (
            <DishForm key={index} dish={item} fetchDishes={fetchDishes} />
          ))}
        <AddDishButton
          categoryId={category.category_id}
          fetchDishes={fetchDishes}
        />
        <UpdateCategoryButton
          fetchCategories={fetchCategories}
          categoryId={category.category_id}
        />
        <Button variant="danger" onClick={handleDeleteCategory}>
          Delete category
        </Button>
      </div>
    </div>
  );
};

export default CategoryView;
