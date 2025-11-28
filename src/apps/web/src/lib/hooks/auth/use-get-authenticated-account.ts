import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedAccountOptions } from "../../options/auth/get-authenticated-account";

export const useAuthenticatedAccount = () => {
  const { data, isLoading, isError, error } = useQuery(
    getAuthenticatedAccountOptions()
  );

  return {
    user: data,
    isAuthenticated: !!data,
    isLoading,
    isError,
    error,
  };
};
