import { mutationOptions } from "@tanstack/react-query";
import { WorkSession } from "@core/domain/work-session";
import DIContainer from "@web/dicontainer";

const usecase = DIContainer.getWorkSessionUseCase();

export const getCreateBulkWorkSessionsOptions = () =>
  mutationOptions({
    mutationKey: ["create-bulk-work-sessions"],
    mutationFn: async (workSessions: WorkSession[]) => {
      return await usecase.createMany(workSessions);
    },
  });