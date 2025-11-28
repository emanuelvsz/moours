import { useMutation } from "@tanstack/react-query";
import { getLoginOptions } from "../../options/auth/login";

export const useLogin = () => {
  const {
    mutate: login,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation(getLoginOptions());

  return {
    login,
    isPending,
    isError,
    errorMessage: error?.message,
    isSuccess,
  };
};
