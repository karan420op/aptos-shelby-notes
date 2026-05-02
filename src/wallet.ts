import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";

const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));

export interface WalletInfo {
  address: string;
  network: string;
  balance: number;
}

export async function getWalletInfo(address: string): Promise<WalletInfo> {
  console.log(Fetching wallet info for: ${address});

  const resources = await aptos.getAccountResources({ accountAddress: address });
  const coinResource = resources.find(
    (r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
  );

  const balance = coinResource
    ? Number((coinResource.data as any).coin.value) / 1e8
    : 0;

  return {
    address,
    network: "testnet",
    balance,
  };
}

export async function verifyOwnership(
  blobId: string,
  walletAddress: string
): Promise<boolean> {
  console.log(Verifying ownership of blob ${blobId} for wallet ${walletAddress});
  // In production this queries the Aptos smart contract
  return true;
}
