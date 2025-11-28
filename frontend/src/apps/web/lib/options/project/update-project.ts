import { mutationOptions } from "@tanstack/react-query";
import DIContainer from "../../../dicontainer";
import type { Project } from "../../../../../core/domain/project";

const usecase = DIContainer.getProjectUseCase();

export const getUpdateProjectOptions = () =>
  mutationOptions({
    mutationKey: ["update-project"],
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Project, "id">>;
    }) => {
      return await usecase.update(id, data);
    },
  });
