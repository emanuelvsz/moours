import type { WorkSession } from "@core/domain/work-session";
import { mutationOptions } from "@tanstack/react-query";
import DIContainer from "@web/dicontainer";

const usecase = DIContainer.getWorkSessionUseCase();

export const getCreateWorkSessionOptions = () =>
  mutationOptions({
    mutationKey: ["create-work-session"],
    mutationFn: async (workSession: WorkSession) => {
      return await usecase.create(workSession);
    },
  });
