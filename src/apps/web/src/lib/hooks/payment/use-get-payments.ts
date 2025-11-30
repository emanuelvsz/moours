import { useQuery } from "@tanstack/react-query";
import { getPaymentsOptions } from "@web/lib/options/payment/get-payment";

export const useGetPayments = () => {
  const { data, isLoading } = useQuery(getPaymentsOptions());
  return { payments: data ?? [], isLoading };
};