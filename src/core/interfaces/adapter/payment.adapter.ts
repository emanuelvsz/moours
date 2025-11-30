import type { Payment } from "../../domain/payment";

export interface PaymentAdapter {
  list(): Promise<Payment[]>;
  create(payment: Payment): Promise<void>;
  update(payment: Payment): Promise<void>;
  getByUserAndMonth(userId: string, month: number, year: number): Promise<Payment | null>;
}