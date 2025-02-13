import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const QuiltModule = buildModule("QuiltModule", (m) => {
    const owner = m.getAccount(0);
    const initialOwner = m.getParameter("initialOwner", owner);
    const quilt = m.contract("Quilt", [initialOwner]);
    return { quilt };
});

export default QuiltModule;
