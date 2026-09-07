import type { PageResponse } from "../types/PageResponse";
import type {
  MovementType,
  StockMovement,
} from "../types/StockMovement";
import { apiRequest } from "./api";

export interface MovementFilters {
  productId?: number;
  warehouseId?: number;
  type?: MovementType;
  from?: string;
  to?: string;
  page?: number;
  size?: number;
}

export function getMovements(
  filters: MovementFilters = {},
): Promise<PageResponse<StockMovement>> {
  const params = new URLSearchParams();

  if (filters.productId !== undefined) {
    params.set("productId", filters.productId.toString());
  }

  if (filters.warehouseId !== undefined) {
    params.set("warehouseId", filters.warehouseId.toString());
  }

  if (filters.type !== undefined) {
    params.set("type", filters.type);
  }

  if (filters.from) {
    params.set("from", filters.from);
  }

  if (filters.to) {
    params.set("to", filters.to);
  }

  params.set("page", (filters.page ?? 0).toString());
  params.set("size", (filters.size ?? 10).toString());

  return apiRequest<PageResponse<StockMovement>>(
    `/stock/movements?${params.toString()}`,
  );
}
