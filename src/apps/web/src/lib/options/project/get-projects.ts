import { queryOptions } from "@tanstack/react-query";
import type { Project } from "@core/domain/project";
import DIContainer from "@web/dicontainer";

const usecase = DIContainer.getProjectUseCase();

export const getProjectsOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => usecase.list(),
  });
