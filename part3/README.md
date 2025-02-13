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

```
npm install -g hardhat
```

Then, run it to initialize a new project:

```
npx hardhat init
```

..select `Create a TypeScript project`, and follow the prompts.

Install other deps:

```
npm install --save-dev dotenv
npm install --save-dev @openzeppelin/contracts
```

## Env

Setup a `.env` with your keys:

1. `ALCHEMY_KEY` - your Alchemy API key
2. `SEPOLIA_PRIVATE_KEY` - your Sepolia acct Metamask private key

## Contract

Here's a minimal NFT contract, built by the _awesome_ [OpenZeppelin Contracts Wizard](https://wizard.openzeppelin.com):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Quilt is ERC721, Ownable {
    uint256 private _nextTokenId;
    uint256 private constant MAX_SUPPLY = 999;

    constructor(address initialOwner) ERC721("Quilt", "QLT") Ownable(initialOwner) {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://IPFS_JSONS_CID/";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        require(tokenId <= MAX_SUPPLY, "exceeded max supply");
        _safeMint(to, tokenId);
    }
}
```

Notes:

1. Uses IPFS for metadata and image asset storage.
2. Very locked down. The `IPFS_CID` is baked in. The `MAX_SUPPLY` is baked in. Both need to be _correctly_ set at contract deploy time.
3. TokenURIs range from `ipfs://IPFS_CID/1` to `ipfs://IPFS_CID/N`

## Test

Run tests with:

```
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

Next, specify any contract parameters in `params.json`:

```json
{
    "Quilt": {
        "initialOwner": "0x25084419c3862324710a6424e68b484f44001A54"
    }
}
```

Then, you can deploy to `Sepolia` testnet like this:

```
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

QuiltModule#Quilt - 0x02456C082ecbE50aeB027D4Ad3Ea37B78F37649E
```

Check it out on [sepolia.etherscan.io](https://sepolia.etherscan.io/address/0x02456C082ecbE50aeB027D4Ad3Ea37B78F37649E)

> NOTE: pass `--reset` to erase and then re-deploy the contract

### Verify

After deploy, you'll want to upload the contract code if you want (you'll need to do this to call any contract methods). Just re-run the deploy (doesn't actually re-deploy without `--reset`), and include `--verify`:

```
npx hardhat ignition deploy ignition/modules/quilt.ts --network sepolia --parameters params.json --verify
```

> Note: verified contracts get a green checkmark next too the code button in etherscan.io
