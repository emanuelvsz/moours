import { Payment } from "@core/domain/payment";
import { mutationOptions } from "@tanstack/react-query";
import DIContainer from "@web/dicontainer";

const adapter = DIContainer.getPaymentAdapter();

export const createPaymentOptions = () =>
  mutationOptions({
    mutationKey: ["create-payment"],
    mutationFn: async (payment: Payment) => adapter.create(payment),
  });
