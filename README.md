# aptos-shelby-notes

A decentralized notes app that stores content on Shelby and records ownership on Aptos.

## Features

- Create and store notes permanently on Shelby
- Ownership recorded on Aptos — only your wallet can edit or delete
- Read notes from anywhere using a blob ID
- End-to-end control with no centralized database
- Petra wallet integration

## Why decentralized notes?

Traditional note apps (Notion, Google Docs) can delete your data or go offline. With Shelby + Aptos, your notes are stored permanently on a decentralized network and owned by your wallet — not a company.

## How it works

1. Write a note in the UI
2. Note is uploaded to Shelby — blob ID returned
3. Blob ID is recorded on Aptos smart contract tied to your wallet
4. Anyone with the blob ID can read the note
5. Only the wallet owner can update or delete

## Shelby Architecture Notes

Shelby uses erasure coding to split data across multiple storage providers. This means:
- No single point of failure
- Data stays available even if some nodes go offline
- Recovery bandwidth is minimized compared to full replication

Hot vs cold storage on Shelby:
- Hot: frequently accessed blobs served fast via dedicated fiber network
- Cold: archived data stored at lower cost with slightly higher retrieval latency

## Project Structure

aptos-shelby-notes/
├── src/
│   ├── notes.ts       # note storage and retrieval logic
│   └── wallet.ts      # Aptos wallet integration
├── index.ts
├── package.json
└── tsconfig.json

## Roadmap

- [x] Core note storage on Shelby
- [x] Aptos wallet ownership verification
- [ ] Frontend UI
- [ ] Note editor
- [ ] List all notes by wallet
- [ ] Delete and update notes
- [ ] Mainnet support

## Setup

npm install
npm run dev

Set your environment variables in .env:

SHELBY_RPC=https://rpc.shelby.xyz
APTOS_NETWORK=testnet

## Status

Work in progress — testnet only.
