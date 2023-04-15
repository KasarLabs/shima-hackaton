const { ethers } = require("hardhat");
const { attach } = require("../../utils/attach");

async function main() {

    const [admin, user] = await ethers.getSigners();
    console.log("Admin account:", admin.address);
    const credit = await attach("CreditContract", process.env.CREDITCONTRACT);
    const stable = await attach("StableCoin", process.env.STABLE);
    const coef = await credit.COEFFICIENT();
    const amount = ethers.utils.parseUnits("500", 6).mul(coef) // in Credit
    const balanceBefore = await stable.balanceOf(user.address);
    const creditsBefore = await credit.credits(user.address);
    await credit.withdraw(user.address, amount);
    const balanceAfter = await stable.balanceOf(user.address);
    const creditsAfter = await credit.credits(user.address);

    console.log(`Stable withdrawed: ${balanceAfter - balanceBefore}`);

    console.log(`Credits deleted: ${creditsAfter - creditsBefore}`);
    
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });