import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { mainnet, scrollTestnet } from "wagmi/chains";
import { scrollSepolia } from "../src/app/components/customChains/scrollSepolia";
// import { scrollSepolia } from "viem/src/chains";
require("dotenv").config();

export const walletConnectProjectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 'npm init wagmi --template next-connectkit'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, scrollTestnet, scrollSepolia],
  [w3mProvider({ projectId: walletConnectProjectId })]
);

export const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 2,
  }),
  publicClient,
  webSocketPublicClient,
});

export { chains };