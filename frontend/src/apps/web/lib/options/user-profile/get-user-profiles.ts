import { queryOptions } from "@tanstack/react-query";
import DIContainer from "../../../dicontainer";
import type { UserProfile } from "../../../../../core/domain/user-profile";

const usecase = DIContainer.getUserProfileUseCase();

export const getUserProfilesOptions = () =>
  queryOptions({
    queryKey: ["user-profiles"],
    queryFn: async (): Promise<UserProfile[]> => usecase.list(),
  });
