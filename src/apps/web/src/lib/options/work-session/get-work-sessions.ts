import type { WorkSession } from "@core/domain/work-session";
import { queryOptions } from "@tanstack/react-query";
import DIContainer from "@web/dicontainer";
 

const usecase = DIContainer.getWorkSessionUseCase();

export const getWorkSessionOptions = () =>
  queryOptions({
    queryKey: ["work-session"],
    queryFn: async (): Promise<WorkSession[]> => usecase.list(),
  });
