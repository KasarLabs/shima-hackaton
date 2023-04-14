const { ethers } = require('hardhat');

async function main() {
    const [admin] = await ethers.getSigners();
    console.log("Admin account:", admin.address);

    const CreditContract = await hre.ethers.getContractFactory("CreditContract");
    const credit = await CreditContract.deploy(process.env.STABLE);
    await credit.deployed();
    console.log(`Credit Contract address: ${credit.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });