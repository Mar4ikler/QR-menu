import { API_URL } from "../constants/url";

export function getUser() {
  return fetch(
    `${API_URL}/users/${window.localStorage.getItem("token") || ""}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
      },
    }
  );
}
