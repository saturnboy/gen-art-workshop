//import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ignition } from "hardhat";
import QuiltModule from "../ignition/modules/quilt";

describe("mint test", () => {
    it("first token minted is #1", async () => {
        const [owner] = await hre.ethers.getSigners();
        const { quilt } = await ignition.deploy(QuiltModule, {
            parameters: { Quilt: { initialOwner: owner.address } },
        });

        // mint the first token (should be #1)
        await quilt.safeMint(owner.address);

        // verify #1 exists and is held by owner
        expect(await quilt.ownerOf(1)).to.equal(owner.address);

        // verify #0 does not exist (because it will throw a nonexistant token error)
        await expect(quilt.ownerOf(0)).to.be.revertedWithCustomError(
            quilt,
            "ERC721NonexistentToken"
        );

        // verify owner holds exactly 1 token
        expect(await quilt.balanceOf(owner.address)).to.equal(1);
    });

    it("mint from 1 to N inclusive", async () => {
        const [owner] = await hre.ethers.getSigners();
        const { quilt } = await ignition.deploy(QuiltModule, {
            parameters: { Quilt: { initialOwner: owner.address } },
        });

        // mint N tokens
        for (let i = 1; i <= 3; i++) {
            await quilt.safeMint(owner.address);
        }

        // verify each token is held by owner
        for (let i = 1; i <= 3; i++) {
            expect(await quilt.ownerOf(i)).to.equal(owner.address);
        }

        // verify owner holds 3 tokens
        expect(await quilt.balanceOf(owner.address)).to.equal(3);
    });

    it("mint N+1 fails with max supply exceeded", async () => {
        const [owner] = await hre.ethers.getSigners();
        const { quilt } = await ignition.deploy(QuiltModule, {
            parameters: { Quilt: { initialOwner: owner.address } },
        });

        // mint N tokens
        for (let i = 1; i <= 3; i++) {
            await quilt.safeMint(owner.address);
        }

        // verify owner holds 3 tokens
        expect(await quilt.balanceOf(owner.address)).to.equal(3);

        // attempt to mint extra token
        await expect(quilt.safeMint(owner.address)).to.be.revertedWith("exceeded max supply");

        // verify owner _still_ holds 3 tokens
        expect(await quilt.balanceOf(owner.address)).to.equal(3);
    });

    it("can mint to other address", async () => {
        const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();
        const { quilt } = await ignition.deploy(QuiltModule, {
            parameters: { Quilt: { initialOwner: owner.address } },
        });

        // mint N tokens
        await quilt.safeMint(addr1.address);
        await quilt.safeMint(addr2.address);
        await quilt.safeMint(addr3.address);

        // verify each token's holder
        expect(await quilt.ownerOf(1)).to.equal(addr1.address);
        expect(await quilt.ownerOf(2)).to.equal(addr2.address);
        expect(await quilt.ownerOf(3)).to.equal(addr3.address);
    });
});
