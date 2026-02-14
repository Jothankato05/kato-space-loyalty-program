# Kato Space Loyalty Program 

Kato Space is a premium, tokenized loyalty platform built on the Sui blockchain. It enables businesses to launch high-performance loyalty programs where points are real digital assets owned by customers.

##  Features

- **Glassmorphic UI**: High-end, modern dashboard for both businesses and customers.
- **Tokenized Points**: Loyalty points are on-chain objects, ensuring transparency and ownership.
- **Instant Finality**: Leveraging Sui's architecture for sub-second reward redemptions.
- **Tiered Progress**: Visual tracking for customer status upgrades (e.g., Silver to Gold).
- **Secure Architecture**: Business capabilities (Cap) ensure only authorized entities can issue points.

##  Project Structure

- `/contracts`: Sui Move smart contracts.
- `/frontend`: React + Vite + Tailwind CSS application.

---

##  Launch Guide

### 1. Smart Contract Deployment
To launch the backend on Sui (Devnet/Testnet/Mainnet):
1.  **Install Sui CLI**: Follow instructions at [docs.sui.io](https://docs.sui.io/guides/developer/getting-started#sui-install).
2.  **Build**: `cd contracts && sui move build`.
3.  **Test**: `sui move test`.
4.  **Publish**:
    ```bash
    sui client publish --gas-budget 100000000
    ```
5.  **Save the IDs**: Note the `PackageID` and the `BusinessCap` object ID from the output.

### 2. Frontend Configuration
Connect your frontend to the deployed contracts:
1.  Open `frontend/src/constants.js`.
2.  Update the `PACKAGE_ID` and `MODULE_NAME`.
3.  (Optional) Add your `PROGRAM_ID` if you want to hardcode a specific loyalty program.

### 3. Production Launch
To serve the production-ready frontend:
1.  **Install**: `cd frontend && npm install`.
2.  **Build**: `npm run build`.
3.  **Preview**: `npm run preview`.
4.  **Deploy**: Upload the `frontend/dist` folder to your favorite hosting provider (Vercel, Netlify, etc.).

---

##  Technology Stack

- **Smart Contracts**: Sui Move
- **Frontend**: React (v19), Vite (v7)
- **Blockchain SDK**: `@mysten/sui` (v2.x)
- **Styles**: Tailwind CSS (v4) + PostCSS
- **Icons**: Lucide React
- **Wallet Support**: `@mysten/dapp-kit`

---
Built by Jothan Jerry Kato for Primers Corporation.
