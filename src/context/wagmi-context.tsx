"use client";

import { config } from "@/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

const WagmiContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiContextProvider;
