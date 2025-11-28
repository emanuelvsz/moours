import { mutationOptions } from "@tanstack/react-query";
import DIContainer from "../../../dicontainer";
import type { Project } from "../../../../../core/domain/project";

const usecase = DIContainer.getProjectUseCase();

export const getCreateProjectOptions = () =>
  mutationOptions({
    mutationKey: ["create-project"],
    mutationFn: async (project: Omit<Project, "id">) => {
      return await usecase.create(project);
    },
  });
