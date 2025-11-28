import { useQuery } from "@tanstack/react-query";
import { getProjectsOptions } from "../../options/project/get-projects";

export const useGetProjects = () => {
  const { data, isLoading: finding } = useQuery(getProjectsOptions());

  return {
    projects: data ?? [],
    finding,
  };
};
