import { useQuery } from "@tanstack/react-query";
import { getUserProfilesOptions } from "../../options/user-profile/get-user-profiles";

export const useGetUserProfiles = () => {
  const {
    data: users,
    isLoading: finding,
    error,
  } = useQuery(getUserProfilesOptions());

  return {
    users: users ?? [],
    finding,
    error,
  };
};
