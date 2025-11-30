import { queryOptions } from "@tanstack/react-query";
import DIContainer from "@web/dicontainer";

const adapter = DIContainer.getPaymentAdapter();

export const getPaymentsOptions = () =>
  queryOptions({
    queryKey: ["payments"],
    queryFn: async () => adapter.list(),
  });
