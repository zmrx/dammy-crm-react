import type { Cart } from "../types";
import type { PaginatedResponse } from "./types";

const BASE_URL = "https://dummyjson.com/carts";

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartsQueryParams {
  limit?: number;
  skip?: number;
  [key: string]: unknown;
}

export interface CreateCartDTO {
  userId: number;
  products: CartItem[];
}

export interface UpdateCartDTO {
  merge?: boolean;
  products: CartItem[];
}

export interface CartsResponse extends PaginatedResponse {
  carts: Cart[];
}

function buildQueryString(
  params: CartsQueryParams & Record<string, unknown>,
): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

export async function getCarts(
  params?: CartsQueryParams,
): Promise<CartsResponse> {
  const queryString = params ? buildQueryString(params) : "";
  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch carts: ${response.status}`);
  }
  return response.json();
}

export async function getCartById(id: number): Promise<Cart> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch cart ${id}: ${response.status}`);
  }
  return response.json();
}

export async function getCartsByUserId(
  userId: number,
  params?: CartsQueryParams,
): Promise<CartsResponse> {
  const queryString = params ? buildQueryString(params) : "";
  const url = queryString
    ? `${BASE_URL}/user/${userId}?${queryString}`
    : `${BASE_URL}/user/${userId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch carts for user ${userId}: ${response.status}`);
  }
  return response.json();
}

export async function createCart(cart: CreateCartDTO): Promise<Cart> {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  if (!response.ok) {
    throw new Error(`Failed to create cart: ${response.status}`);
  }
  return response.json();
}

export async function updateCart(
  id: number,
  cart: UpdateCartDTO,
  method: "PUT" | "PATCH" = "PATCH",
): Promise<Cart> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  if (!response.ok) {
    throw new Error(`Failed to update cart ${id}: ${response.status}`);
  }
  return response.json();
}

export async function deleteCart(
  id: number,
): Promise<Cart & { isDeleted: boolean; deletedOn: string }> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete cart ${id}: ${response.status}`);
  }
  return response.json();
}
