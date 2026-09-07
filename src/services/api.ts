import type { ApiError } from "../types/ApiError";

export class ApiException extends Error {
  status: number;
  details: ApiError["details"];

  constructor(error: ApiError) {
    super(error.message);

    this.name = "ApiException";
    this.status = error.status;
    this.details = error.details;
  }
}

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`/api${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const apiError = (await response.json()) as ApiError;

    throw new ApiException(apiError);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
