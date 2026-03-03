import type { User } from "../types";
import type { UsersResponse } from "./types";

const BASE_URL = "https://dummyjson.com";

export async function getUsers(
  page: number = 1,
  limit: number = 10,
  search: string = "",
): Promise<UsersResponse> {
  const skip = (page - 1) * limit;

  let url: string;
  if (search) {
    url = `${BASE_URL}/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else {
    url = `${BASE_URL}/users?limit=${limit}&skip=${skip}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
}
