const { ethers } = require("hardhat");
const { attach } = require("../../utils/attach");

async function main() {

    const [admin, user] = await ethers.getSigners();
    console.log("User account:", user.address);
    const credit = await attach("CreditContract", process.env.CREDITCONTRACT);

    const creditsBalance = await credit.credits(user.address);
    console.log(`Credits balance: ${creditsBalance}`);
    
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });