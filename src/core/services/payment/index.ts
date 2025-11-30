import PaymentUseCase from "@core/interfaces/usecase/payment.usecase";
import { PaymentAdapter } from "@core/interfaces/adapter/payment.adapter";
import { Payment } from "@core/domain/payment";

class PaymentService implements PaymentUseCase {
  protected readonly adapter: PaymentAdapter;

  constructor(adapter: PaymentAdapter) {
    this.adapter = adapter;
  }

  async list(): Promise<Payment[]> {
    return this.adapter.list();
  }

  async create(payment: Payment): Promise<void> {
    return this.adapter.create(payment);
  }

  async update(payment: Payment): Promise<void> {
    return this.adapter.update(payment);
  }

  async getByUserAndMonth(
    userId: string,
    month: number,
    year: number
  ): Promise<Payment | null> {
    return this.adapter.getByUserAndMonth(userId, month, year);
  }
}

export default PaymentService;
