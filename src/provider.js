
'use client'
import { config, queryClient } from '../src/config/config';
import { WagmiProvider } from 'wagmi';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
    QueryClientProvider,
    QueryClient,
  } from "@tanstack/react-query";

export default function Provider ({children}) {
    return (
        <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            {children}
        </RainbowKitProvider>
        </QueryClientProvider>
        </WagmiProvider>
    )
}