# Solana Balance Checker

This program fetches the balance of a Solana account either by a public key or a `.sol` domain name. It connects to the Solana mainnet and uses the `@solana/web3.js` and `@bonfida/spl-name-service` libraries to achieve this.

## Features

- Retrieve the balance of a Solana account using a public key.
- Resolve `.sol` domain names to public keys and retrieve their balances.
- Connect to the Solana mainnet for live data.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository or download the script.

2. Navigate to the project directory.

3. Install the required dependencies:
   ```bash
   npm install @solana/web3.js @bonfida/spl-name-service
