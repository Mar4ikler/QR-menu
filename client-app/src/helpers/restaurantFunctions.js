import { API_URL } from "../constants/url";

export function getRestaurant() {
  return fetch(`${API_URL}/restaurants`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
  });
}

export function postRestaurant(restaurantName, description, ip) {
  return fetch(`${API_URL}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify({
      restaurant_name: restaurantName,
      description: description,
      ip: ip,
    }),
  });
}

export function updateRestaurant(restaurantName, description, ip) {
  return fetch(`${API_URL}/restaurants`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify({
      restaurant_name: restaurantName,
      description: description,
      ip: ip,
    }),
  });
}
