import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLogoutOptions } from "../../options/auth/logout";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    ...getLogoutOptions(),
    onSuccess: () => {
      queryClient.setQueryData(["authenticated-account"], null);
    },
  });

  return {
    logout,
    isPending,
  };
};
