import { useQuery } from "@tanstack/react-query";
import { getWorkSessionOptions } from "../../options/work-session/get-work-sessions";

export const useGetWorkSessions = () => {
  const { data, isLoading: finding } = useQuery(getWorkSessionOptions());

  return { workSessions: data ?? [], finding };
};
