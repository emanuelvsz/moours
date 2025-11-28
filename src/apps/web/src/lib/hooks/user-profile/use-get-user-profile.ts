import { useQuery } from "@tanstack/react-query";
import { getUserProfileOptions } from "../../options/user-profile/get-user-profile";

export const useGetUserProfile = (id: string) => {
  const {
    data: user,
    isLoading: finding,
    error,
  } = useQuery(getUserProfileOptions(id));

  return {
    user: user ?? null,
    finding,
    error,
  };
};
