import { Loader2 } from "lucide-react";
import { Suspense, type PropsWithChildren } from "react";

const PageWrapper = ({ children }: PropsWithChildren) => (
  <Suspense
    fallback={
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
      </div>
    }
  >
    {children}
  </Suspense>
);

export default PageWrapper;
