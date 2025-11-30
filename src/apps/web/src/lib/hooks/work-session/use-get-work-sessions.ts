import { useQuery } from "@tanstack/react-query";
import { getWorkSessionOptions } from "../../options/work-session/get-work-sessions";

export const useGetWorkSessions = () => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    getWorkSessionOptions()
  );

  return {
    workSessions: data ?? [],
    finding: isLoading,
    isError,
    error,
    refetch,
  };
};