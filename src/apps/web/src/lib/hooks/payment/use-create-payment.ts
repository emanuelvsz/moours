import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPaymentOptions } from "@web/lib/options/payment/create-payment";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  const { mutate: createPayment, isPending } = useMutation({
    ...createPaymentOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });

  return { createPayment, isPending };
};
