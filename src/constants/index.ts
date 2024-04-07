import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const { Testnet, Devnet } = WalletAdapterNetwork;
export const Cluster = process.env.NODE_ENV === "production" ? Testnet : Devnet;
