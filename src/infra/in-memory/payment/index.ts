import { Payment } from "@core/domain/payment";
import { PaymentAdapter } from "@core/interfaces/adapter/payment.adapter";

class PaymentInMemory implements PaymentAdapter {
  private static payments: Payment[] = [];

  async list(): Promise<Payment[]> {
    return PaymentInMemory.payments;
  }

  async create(payment: Payment): Promise<void> {
    PaymentInMemory.payments.push(payment);
  }

  async update(payment: Payment): Promise<void> {
    const index = PaymentInMemory.payments.findIndex(
      (p) => p.id === payment.id
    );
    if (index !== -1) {
      PaymentInMemory.payments[index] = payment;
    }
  }

  async getByUserAndMonth(
    userId: string,
    month: number,
    year: number
  ): Promise<Payment | null> {
    return (
      PaymentInMemory.payments.find(
        (p) => p.freelancerId === userId && p.month === month && p.year === year
      ) || null
    );
  }
}

export default PaymentInMemory;
