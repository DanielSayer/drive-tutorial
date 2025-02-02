import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};
