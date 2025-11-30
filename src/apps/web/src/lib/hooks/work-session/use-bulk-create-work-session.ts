import { useMutation } from "@tanstack/react-query";
import { getCreateBulkWorkSessionsOptions } from "@web/lib/options/work-session/bulk-create-work-session";

export const useCreateBulkWorkSessions = () => {
  const {
    mutate: createBulk,
    mutateAsync: createBulkAsync,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation(getCreateBulkWorkSessionsOptions());

  return {
    createBulk,
    createBulkAsync,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
