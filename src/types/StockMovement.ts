export type MovementType = "IN" | "OUT";

export interface StockMovement {
  id: number;
  productSku: string;
  productName: string;
  warehouseName: string;
  type: MovementType;
  quantity: number;
  reason: string | null;
  reference: string | null;
  occurredAt: string;
}
