import { API_URL } from "../constants/url";

export function getRestaurant() {
  return fetch(
    `${API_URL}/restaurants/${window.localStorage.getItem("token") || ""}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
      },
    }
  );
}

export function postRestaurant(restaurantName, description) {
  return fetch(
    `${API_URL}/restaurants/${window.localStorage.getItem("token") || ""}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify({
        restaurant_name: restaurantName,
        description: description,
      }),
    }
  );
}