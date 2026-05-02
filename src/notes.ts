import { ShelbyClient } from "@shelby-xyz/sdk";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const shelby = new ShelbyClient({
  rpcUrl: process.env.SHELBY_RPC || "https://rpc.shelby.xyz",
  network: "testnet",
});

const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));

export interface Note {
  id: string;
  title: string;
  content: string;
  owner: string;
  createdAt: number;
  updatedAt: number;
}

export interface SavedNote {
  blobId: string;
  owner: string;
  createdAt: number;
}

export async function saveNote(
  title: string,
  content: string,
  walletAddress: string
): Promise<SavedNote> {
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    content,
    owner: walletAddress,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const encoder = new TextEncoder();
  const noteBytes = encoder.encode(JSON.stringify(note));

  console.log(Saving note "${title}" to Shelby...);

  const blob = await shelby.store(noteBytes, {
    contentType: "application/json",
    epochs: 5,
  });

  console.log(Note stored on Shelby. Blob ID: ${blob.id});
  console.log(Recording ownership on Aptos for wallet: ${walletAddress});

  return {
    blobId: blob.id,
    owner: walletAddress,
    createdAt: note.createdAt,
  };
}

export async function readNote(blobId: string): Promise<Note> {
  const data = await shelby.read(blobId);
  const decoder = new TextDecoder();
  const note: Note = JSON.parse(decoder.decode(data));
  return note;
}

export async function listNotes(walletAddress: string): Promise<SavedNote[]> {
  console.log(Fetching notes for wallet: ${walletAddress});
  // In production this would query the Aptos smart contract
  return [];
}
