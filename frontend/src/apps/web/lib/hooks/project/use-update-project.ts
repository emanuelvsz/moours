import { useMutation } from "@tanstack/react-query";
import { getUpdateProjectOptions } from "../../options/project/update-project";

export const useUpdateProject = () => {
  const {
    mutate: updateProject,
    data: updated,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation(getUpdateProjectOptions());

  return {
    updateProject,
    updated,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
