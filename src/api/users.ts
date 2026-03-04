import type { User } from "../types";
import type { UsersResponse } from "./types";

const BASE_URL = "https://dummyjson.com/users";

export interface UserQueryParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  [key: string]: unknown;
}

function buildUserQueryString(params: UserQueryParams): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

export async function getUsers(
  params: UserQueryParams
): Promise<UsersResponse> {
  const queryString = params ? buildUserQueryString(params) : "";
  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const url = `${BASE_URL}/${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch user ${id}: ${response.status}`);
  }
  return response.json();
}

export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
}
