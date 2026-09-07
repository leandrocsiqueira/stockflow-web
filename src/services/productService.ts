import type {
  Product,
  ProductRequest,
} from "../types/Product";
import { apiRequest } from "./api";

export function getProducts(): Promise<Product[]> {
  return apiRequest<Product[]>("/products");
}

export function createProduct(
  product: ProductRequest,
): Promise<Product> {
  return apiRequest<Product>("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}
