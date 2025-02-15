// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Quilt is ERC721, Ownable {
    uint256 private _nextTokenId;
    uint256 private constant MAX_SUPPLY = 3;

    constructor(address initialOwner) ERC721("Quilt", "QLT") Ownable(initialOwner) {
        _nextTokenId = 1; // first token is #1
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmbCtH398mJZEHsGLhU8BQ73kqK1bcYt9anKtcUGQiS1Gz/";
    }

    function safeMint(address to) public onlyOwner {
        require(_nextTokenId <= MAX_SUPPLY, "exceeded max supply");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
