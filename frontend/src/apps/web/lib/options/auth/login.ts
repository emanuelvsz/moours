import { mutationOptions } from "@tanstack/react-query";
import DIContainer from "../../../dicontainer";

const authAdapter = DIContainer.getAuthAdapter();

export type LoginCredentials = {
  email: string;
  password: string;
};

export const getLoginOptions = () =>
  mutationOptions({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: LoginCredentials) => {
      const isAuthenticated = await authAdapter.login(email, password);
      if (!isAuthenticated) {
        throw new Error("Invalid email or password");
      }
      return isAuthenticated;
    },
  });
