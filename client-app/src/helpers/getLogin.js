import { API_URL } from "../constants/url";

export function getLogin(username, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
}
