import { mutationOptions } from "@tanstack/react-query";
import type { Project } from "@core/domain/project";
import DIContainer from "@web/dicontainer";

const usecase = DIContainer.getProjectUseCase();

export const getCreateProjectOptions = () =>
  mutationOptions({
    mutationKey: ["create-project"],
    mutationFn: async (project: Omit<Project, "id">) => {
      return await usecase.create(project);
    },
  });
