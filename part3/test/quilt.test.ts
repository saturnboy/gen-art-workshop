//import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ignition } from "hardhat";
import QuiltModule from "../ignition/modules/quilt";

describe("test contract", () => {
    it("should deploy contract with owner", async () => {
        const { quilt } = await ignition.deploy(QuiltModule);

        // verify quilt is deployed (...just check if quilt is not null)
        expect(quilt).to.not.equal(null);

        // get contract owner (aka the wallet that deployed, and thus owns, the contract)
        const [owner] = await hre.ethers.getSigners();
        expect(owner.address).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

        // verify the contract is deployed & owned by that wallet
        expect(await quilt.owner()).to.hexEqual(owner.address);
    });
});
