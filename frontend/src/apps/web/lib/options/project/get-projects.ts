import { queryOptions } from "@tanstack/react-query";
import DIContainer from "../../../dicontainer";
import type { Project } from "../../../../../core/domain/project";

const usecase = DIContainer.getProjectUseCase();

export const getProjectsOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => usecase.list(),
  });
