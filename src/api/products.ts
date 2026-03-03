import type { Product } from "../types";
import type { ProductsResponse } from "./types";

const BASE_URL = "https://dummyjson.com/products";

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsQueryParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  [key: string]: unknown;
}

export interface CreateProductDTO extends Partial<
  Omit<Product, "id" | "meta" | "reviews">
> {
  title: string;
  description: string;
  category: string;
  price: number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;

function buildQueryString(
  params: ProductsQueryParams & Record<string, unknown>,
): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

export async function getProducts(
  params?: ProductsQueryParams,
): Promise<ProductsResponse> {
  const queryString = params ? buildQueryString(params) : "";
  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  return response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}: ${response.status}`);
  }
  return response.json();
}

export async function searchProducts(
  query: string,
  params?: ProductsQueryParams,
): Promise<ProductsResponse> {
  const searchParams: Record<string, unknown> = { q: query, ...params };
  const queryString = buildQueryString(searchParams);
  const url = `${BASE_URL}/search?${queryString}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to search products: ${response.status}`);
  }
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  return response.json();
}

export async function getCategoryList(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/category-list`);
  if (!response.ok) {
    throw new Error(`Failed to fetch category list: ${response.status}`);
  }
  return response.json();
}

export async function getProductsByCategory(
  category: string,
  params?: ProductsQueryParams,
): Promise<ProductsResponse> {
  const queryString = params ? buildQueryString(params) : "";
  const url = queryString
    ? `${BASE_URL}/category/${category}?${queryString}`
    : `${BASE_URL}/category/${category}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products by category: ${response.status}`);
  }
  return response.json();
}

export async function createProduct(
  product: CreateProductDTO,
): Promise<Product> {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.status}`);
  }
  return response.json();
}

export async function updateProduct(
  id: number,
  product: UpdateProductDTO,
  method: "PUT" | "PATCH" = "PATCH",
): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to update product ${id}: ${response.status}`);
  }
  return response.json();
}

export async function deleteProduct(
  id: number,
): Promise<Product & { isDeleted: boolean; deletedOn: string }> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete product ${id}: ${response.status}`);
  }
  return response.json();
}
