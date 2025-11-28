import { useMutation } from "@tanstack/react-query";
import { getCreateProjectOptions } from "../../options/project/create-project";

export const useCreateProject = () => {
  const {
    mutate: createProject,
    data: created,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation(getCreateProjectOptions());

  return {
    createProject,
    created,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
