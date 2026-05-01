import { ShelbyClient } from "@shelby-xyz/sdk";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const shelby = new ShelbyClient({
  rpcUrl: process.env.SHELBY_RPC || "https://rpc.shelby.xyz",
  network: "testnet",
});

const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));

export async function saveNote(content: string, walletAddress: string): Promise<string> {
  const encoder = new TextEncoder();
  const contentBytes = encoder.encode(content);

  console.log("Uploading note to Shelby...");
  const blob = await shelby.store(contentBytes, {
    contentType: "text/plain",
    epochs: 5,
  });

  console.log(Note stored. Blob ID: ${blob.id});
  console.log(Recording blob ID on Aptos for wallet: ${walletAddress});

  return blob.id;
}

export async function readNote(blobId: string): Promise<string> {
  const data = await shelby.read(blobId);
  const decoder = new TextDecoder();
  return decoder.decode(data);
}
