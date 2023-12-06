import { API_URL } from "../constants/url";

export function getCategories() {
  return fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
  });
}

export function postCategory(categoryName) {
  return fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify({
      category_name: categoryName,
    }),
  });
}

export function deleteCategory(categoryId) {
  return fetch(`${API_URL}/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
  });
}

export function updateCategory(categoryId, categoryName) {
  return fetch(`${API_URL}/categories/${categoryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify({
      category_name: categoryName,
    }),
  });
}