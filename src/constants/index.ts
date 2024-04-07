import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
const ENV = import.meta.env;
const { Testnet, Devnet } = WalletAdapterNetwork;
export const Cluster = ENV.NODE_ENV === "production" ? Testnet : Devnet;
