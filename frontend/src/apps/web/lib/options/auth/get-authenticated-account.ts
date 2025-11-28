import { queryOptions } from "@tanstack/react-query";
import DIContainer from "../../../dicontainer";

const authAdapter = DIContainer.getAuthAdapter();

export const getAuthenticatedAccountOptions = () =>
  queryOptions({
    queryKey: ["authenticated-account"],
    queryFn: async () => {
      return await authAdapter.findAuthenticatedAccount();
    },
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });
