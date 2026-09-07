export interface Product {
  id: number;
  sku: string;
  name: string;
  unit: string;
  minimumStock: number;
}

export interface ProductRequest {
  sku: string;
  name: string;
  unit: string;
  minimumStock: number;
}
