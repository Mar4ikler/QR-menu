import { API_URL } from "../constants/url";

export function getDishes(categoryId, filterString) {
  return fetch(`${API_URL}/dishes/${categoryId}?like=${filterString}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
  });
}

export function postDish(dishName, description, price, categoryId) {
  return fetch(`${API_URL}/dishes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify({
      dish_name: dishName,
      description: description,
      price: price,
      category_id: categoryId,
    }),
  });
}

export function deleteDish(dishId) {
  return fetch(`${API_URL}/dishes/${dishId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
  });
}

export function updateDish(dishId, dishName, description, price) {
  return fetch(`${API_URL}/dishes/${dishId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify({
      dish_name: dishName,
      description: description,
      price: price,
    }),
  });
}
