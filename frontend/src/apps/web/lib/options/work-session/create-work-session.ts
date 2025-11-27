import { mutationOptions } from "@tanstack/react-query";
import DIContainer from "../../../dicontainer";
import type { WorkSession } from "../../../../../core/domain/work-session";

const usecase = DIContainer.getWorkSessionUseCase();

export const getCreateWorkSessionOptions = () =>
  mutationOptions({
    mutationKey: ["create-work-session"],
    mutationFn: async (workSession: WorkSession) => {
      return await usecase.create(workSession);
    },
  });
