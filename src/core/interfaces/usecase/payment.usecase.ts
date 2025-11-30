import type { Payment } from "../../domain/payment";

abstract class PaymentUseCase {
  abstract list(): Promise<Payment[]>;
  abstract create(payment: Payment): Promise<void>;
  abstract update(payment: Payment): Promise<void>;
  abstract getByUserAndMonth(
    userId: string,
    month: number,
    year: number
  ): Promise<Payment | null>;
}

export default PaymentUseCase;
