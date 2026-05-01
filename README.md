# aptos-shelby-notes

A decentralized notes app that stores note content on Shelby and records ownership on Aptos.

## Overview

aptos-shelby-notes lets users create, store, and share notes permanently. Note content is uploaded to Shelby as blobs. The blob ID is then recorded on Aptos so only the wallet owner can edit or delete it.

## How it works

1. User writes a note in the UI
2. Note content is uploaded to Shelby — a blob ID is returned
3. Blob ID is written to Aptos smart contract tied to user's wallet
4. Anyone with the blob ID can read the note
5. Only the wallet owner can update or delete it

## Stack

- Shelby TypeScript SDK
- Aptos TypeScript SDK
- React frontend
- Petra wallet integration

## Status

Work in progress — testnet only.

## Setup

`bash
npm install
npm run dev
