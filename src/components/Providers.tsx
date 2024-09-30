"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
      <CookiesProvider>{children}</CookiesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
