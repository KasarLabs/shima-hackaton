const { ethers } = require("hardhat");
const { attach } = require("../../utils/attach");

async function main() {

    const [admin, user] = await ethers.getSigners();
    console.log("Admin account:", admin.address);

    const credit = await attach("CreditContract", process.env.CREDITCONTRACT);
    const amount = ethers.utils.parseUnits("500", 6).mul(coef) // in Credit
    
    const creditsBefore = await credit.credits(user.address);
    await credit.withdrawCredits([user.address], [amount]);
    const creditsAfter = await credit.credits(user.address);

  

    console.log(`Credits deleted: ${creditsAfter - creditsBefore}`);

    
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });