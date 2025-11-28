import { createContext } from "react";
import type { SingleRoute } from "../types/route";

interface InternalRouteCTXProps {
  activeRoute: SingleRoute | null;
}

export const InternalRouteCTX = createContext<InternalRouteCTXProps>({
  activeRoute: null,
});
