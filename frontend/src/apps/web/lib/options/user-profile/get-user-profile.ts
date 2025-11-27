import { queryOptions } from "@tanstack/react-query";
import DIContainer from "../../../dicontainer";
import type { UserProfile } from "../../../../../core/domain/user-profile";

const usecase = DIContainer.getUserProfileUseCase();

export const getUserProfileOptions = (id: string) =>
  queryOptions({
    queryKey: ["user-profiles", id],
    queryFn: async ({ queryKey }): Promise<UserProfile | null> => {
      const [, userId] = queryKey;
      return usecase.find(userId);
    },
  });
