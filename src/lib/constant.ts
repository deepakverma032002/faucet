export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const SUPPORTED_CHAIN_ID = IS_PRODUCTION ? 51181 : 51181;

export const CUSTOM_CHAIN_CONFIG = {
  depo: {
    name: "Depo",
    chainId: 51181,
    network: "depotest1-cekn9bdkjj",
    currency: {
      name: "TDEPO",
      symbol: "TDepo",
    },
    rpcUrl: "https://test1rpc.depo.network/",
    blockExplorer: "https://test1exp.depo.network/",
  },
};
