import { useMutation } from "@tanstack/react-query";
import { getCreateWorkSessionOptions } from "../../options/work-session/create-work-session";

export const useCreateWorkSession = () => {
  const {
    mutate: createWorkSession,
    mutateAsync: createWorkSessionAsync,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation(getCreateWorkSessionOptions());

  return {
    createWorkSession,
    createWorkSessionAsync,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
