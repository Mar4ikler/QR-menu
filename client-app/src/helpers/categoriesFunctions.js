import { API_URL } from "../constants/url";

export function getCategories() {
  return fetch(
    `${API_URL}/categories`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
      },
    }
  );
}