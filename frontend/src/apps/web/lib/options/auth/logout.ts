import { mutationOptions } from "@tanstack/react-query";
import DIContainer from "../../../dicontainer";

const authAdapter = DIContainer.getAuthAdapter();

export const getLogoutOptions = () =>
  mutationOptions({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return await authAdapter.logout();
    },
  });
