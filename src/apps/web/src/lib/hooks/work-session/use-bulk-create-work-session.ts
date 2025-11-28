import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCreateBulkWorkSessionsOptions } from "@web/lib/options/work-session/bulk-create-work-session";

export const useCreateBulkWorkSessions = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createBulk,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    ...getCreateBulkWorkSessionsOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-session"] });
    },
  });

  return {
    createBulk,
    isPending,
    isSuccess,
    isError,
    error,
  };
};