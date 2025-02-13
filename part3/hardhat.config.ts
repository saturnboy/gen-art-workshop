import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

// load .env
dotenv.config();
const { ALCHEMY_API_KEY, SEPOLIA_PRIVATE_KEY } = process.env;

// validate .env
if (!ALCHEMY_API_KEY) {
    throw new Error("Missing ALCHEMY_API_KEY in .env");
}
if (!SEPOLIA_PRIVATE_KEY) {
    throw new Error("Missing SEPOLIA_PRIVATE_KEY in .env");
}

const config: HardhatUserConfig = {
    solidity: "0.8.28",
    networks: {
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [SEPOLIA_PRIVATE_KEY],
        },
    },
};

export default config;
