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

Here's a minimal NFT contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Quilt is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _cnt;
    uint256 public constant MAX_SUPPLY = 999;

    constructor() ERC721("Quilt", "QLT") {
        _cnt.increment(); // first token is 1
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://IPFS_CID/";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokId = _cnt.current();
        require(tokId <= MAX_SUPPLY, "exceeded max supply");
        _cnt.increment();
        _safeMint(to, tokId);
    }
}
```

Notes:

1. Uses IPFS for metadata and image asset storage.
2. Very locked down. The `IPFS_CID` is baked in. The `MAX_SUPPLY` is baked in. Both need to be _correctly_ set at contract deploy time.
3. TokenURIs range from `ipfs://IPFS_CID/1` to `ipfs://IPFS_CID/N`

##
