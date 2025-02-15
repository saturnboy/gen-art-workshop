# Part 3

## Images & Metadata

An NFT collection is really just a set of JSON metadata files (see the [ERC721 spec](https://github.com/ethereum/ercs/blob/master/ERCS/erc-721.md), see [OpenSea Metadata Standards](https://docs.opensea.io/docs/metadata-standards)), each pointing to a unique asset (an image of our Quilt in our case).

We'll be storing both the metadata .json and the quilt .png in IPFS. There are many free IPFS providers out there...just pick one. [Filebase](https://filebase.com/) offers 5gb free. Each quilt .png is ~650kb.

### Images

Use [capture](../part2/capture) to capture N 1600x900 .pngs of our quilt. Drop these in the [imgs](imgs/) folder, upload the `imgs` _folder_ to an IPFS bucket, and grab the `CID` of the folder.

### Metadata

Update `prepare_metadata.py` with the CID, and then run `python prepare_metadata.py` to generate the metadata .json in the [jsons](jsons/) folder. Upload the `jsons` _folder_ to the same bucket, and grab that `CID` (it will be different).

## Setup

First, install [Hardhat](https://hardhat.org/) globally:

```sh
npm install -g hardhat
```

Then, run it to initialize a new project:

```sh
npx hardhat init
```

..select `Create a TypeScript project`, and follow the prompts.

Install other deps:

```sh
npm install --save-dev dotenv
npm install --save-dev @openzeppelin/contracts
```

## Env

Setup a `.env` with your keys:

1. `ALCHEMY_KEY` - your Alchemy API key
2. `SEPOLIA_PRIVATE_KEY` - your Sepolia acct Metamask private key

## Contract

Here's a minimal NFT contract, built by the _awesome_ [OpenZeppelin Contracts Wizard](https://wizard.openzeppelin.com), plus some slight modifications to make the first token minted #1 (not #0):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Quilt is ERC721, Ownable {
    uint256 private _nextTokenId;
    uint256 private constant MAX_SUPPLY = 999;

    constructor(address initialOwner) ERC721("Quilt", "QLT") Ownable(initialOwner) {
        _nextTokenId = 1; // first token is #1
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://IPFS_JSONS_CID/";
    }

    function safeMint(address to) public onlyOwner {
        require(_nextTokenId <= MAX_SUPPLY, "exceeded max supply");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
```

Notes:

1. Uses IPFS for metadata and image asset storage.
2. Very locked down. The IPFS `CID` is baked in. The `MAX_SUPPLY` is baked in. Both need to be _correctly_ set at contract deploy time.
3. TokenURIs start at #1 (`ipfs://IPFS_CID/1`) and got to N inclusive (`ipfs://IPFS_CID/N`)

## Test

Run tests with:

```sh
npx hardhat test
```

## Deploy

First, configure a _live_ network and API gateway (I like [Alchemy](https://www.alchemy.com)) in `hardhat.config.ts`:

```ts
const config: HardhatUserConfig = {
    solidity: "0.8.28",
    networks: {
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [SEPOLIA_PRIVATE_KEY],
        },
    },
};
```

Next, specify the contract parameters in `params.json`, for our contract we specify the `initialOwner`:

```json
{
    "Quilt": {
        "initialOwner": "0x25084419c3862324710a6424e68b484f44001A54"
    }
}
```

Then, you can deploy to `Sepolia` testnet using [Hardhat Ignition](https://hardhat.org/ignition/docs/getting-started#overview) like this:

```sh
npx hardhat ignition deploy ignition/modules/quilt.ts --network sepolia --parameters params.json
```

Output looks like this:

```text
✔ Confirm deploy to network sepolia (11155111)? … yes
Hardhat Ignition 🚀

Deploying [ QuiltModule ]

Batch #1
  Executed QuiltModule#Quilt

[ QuiltModule ] successfully deployed 🚀

Deployed Addresses

QuiltModule#Quilt - 0x3a07cdb338dcC679f2220CEe2104deeE3f4fe1E2
```

The contract is now deployed on the Sepolia testnet. Check it out on [sepolia.etherscan.io](https://sepolia.etherscan.io/address/0x3a07cdb338dcC679f2220CEe2104deeE3f4fe1E2)

> NOTE: Pass in `--reset` to erase the local deployment cache and then re-deploy the contract (which will deploy to an all new address). The blockchain is immutable, so the original live deployment can be erased or removed.

> NOTE 2: Pass in `--verify` to deploy and _verify_ on Etherscan all in one shot (see [Verify](#Verify) section below).

### Verify

After deploy, you'll want to upload the contract code to Etherscan in order to call any contract methods. Just re-run the deploy (doesn't actually re-deploy without `--reset`), and include `--verify`.

First, configure your Etherscan API key:

```ts
const config: HardhatUserConfig = {
    solidity: "0.8.28",
    networks: ..,
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
    }
};
```

Then re-deploy (doesn't actually re-deploy without `--reset`) to verify:

```sh
npx hardhat ignition deploy ignition/modules/quilt.ts --network sepolia --verify
```

Output is:

```text
✔ Confirm deploy to network sepolia (11155111)? … yes
[ QuiltModule ] Nothing new to deploy based on previous execution stored in ./ignition/deployments/chain-11155111

Deployed Addresses

QuiltModule#Quilt - 0x3a07cdb338dcC679f2220CEe2104deeE3f4fe1E2

Verifying deployed contracts

Verifying contract "contracts/quilt.sol:Quilt" for network sepolia...
Successfully verified contract "contracts/quilt.sol:Quilt" for network sepolia:
  - https://sepolia.etherscan.io/address/0x3a07cdb338dcC679f2220CEe2104deeE3f4fe1E2#code
```

> NOTE: You don't need to run this separately, you can pass in `--verify` with the intial deploy command to deploy and verify all in one shot.

> NOTE 2: Once a contract is verified, it will have a green checkmark on the `Code` button in Etherscan
