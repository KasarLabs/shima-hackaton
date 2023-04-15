const { ethers } = require("hardhat");
const { attach } = require("../../utils/attach");

async function main() {

    const [admin, user, ...providers] = await ethers.getSigners();
    console.log("Admin account:", admin.address);
    console.log(process.env.STABLE);
    const stable = await attach("StableCoin", process.env.STABLE);
    const credit = await attach("CreditContract", process.env.CREDITCONTRACT);
    
    const totalAmount = await stable.balanceOf(credit.address);
    const providerAddresses = await Promise.all(providers.map(provider => provider.getAddress()));
    
    const withdrawAddress = [admin.address, ...providerAddresses];
    const amounts = [totalAmount.sub(totalAmount.div(10))] // in usdc // start to init with fees
    for (const provider of providers) {
        amounts.push(totalAmount.sub(amounts[0]).div(providers.length)); // In fact provider have some weights
    }
    await credit.distributeStable(withdrawAddress, amounts);
    const finalAmount = await stable.balanceOf(credit.address);
    console.log(`${totalAmount - finalAmount} has been distributed to providers`)

    
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });