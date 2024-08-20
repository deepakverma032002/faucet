import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isWalletAddress(address: string) {
  const patterns = [
    /^0x[a-fA-F0-9]{40}$/, // Ethereum/BSC
    /^(1|3|bc1)[a-zA-Z0-9]{25,39}$/, // Bitcoin
    /^[1-9A-HJ-NP-Za-km-z]{32,44}$/, // Solana
    /^addr1[a-zA-Z0-9]{58,65}$/, // Cardano
  ];

  return patterns.some((pattern) => pattern.test(address));
}