const { ethers } = require("hardhat");

const attach = async (factory, address) => {
    let ContractFactory = await ethers.getContractFactory(factory);
    let contract = await ContractFactory.attach(address);
    console.log(factory, "has been load");
    return contract;
}

module.exports = {
    attach
}