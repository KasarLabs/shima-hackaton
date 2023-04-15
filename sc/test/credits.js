const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CreditContract", function () {
    let contractInstance;
    let stable;
    let owner;
    let user1;
    let user2;
    const COEFFICIENT = 1000;
    const decimals = 18;

    const rechargeAmount = ethers.utils.parseUnits("1000", decimals); // 1000 DAI
    const withdrawalAmount = ethers.utils.parseUnits("500", decimals); // 500k credits
    const amounts = [ethers.utils.parseUnits("500", decimals), ethers.utils.parseUnits("200", decimals)]; // [500 DAI, 200 DAI]
    const recipients = [];

    before(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        const StableCoin = await ethers.getContractFactory("StableCoin");
        stable = await StableCoin.deploy(decimals);

        const CreditContract = await ethers.getContractFactory("CreditContract");
        contractInstance = await CreditContract.deploy(stable.address);

        // Give some STB to users
        await stable.mint(user1.address, ethers.utils.parseUnits("10000",  decimals));
        await stable.mint(user2.address, ethers.utils.parseUnits("10000",  decimals));

        // Add users to recipients array
        recipients.push(user1.address);
        recipients.push(user2.address);
    });

    it("should recharge credits", async function () {
        const allowance = rechargeAmount;
        await stable.connect(user1).approve(contractInstance.address, allowance);

        const balanceBefore = await stable.balanceOf(contractInstance.address);
        await expect(contractInstance.connect(user1).recharge(rechargeAmount)).to.emit(contractInstance, "CreditRecharge").withArgs(user1.address, rechargeAmount.mul(COEFFICIENT));
        const balanceAfter = await stable.balanceOf(contractInstance.address);

        const expectedBalance = balanceBefore.add(allowance);
        expect(balanceAfter).to.equal(expectedBalance, "Contract balance not updated correctly");

        const expectedCredits = rechargeAmount.mul(COEFFICIENT);
        expect(await contractInstance.credits(user1.address)).to.equal(expectedCredits, "Credits not updated correctly");

    });
    it("should distribute stable coins", async function () {
        let totalAmount = ethers.BigNumber.from("0");

        // Approve transfer for the total amount to distribute
        for (let i = 0; i < recipients.length; i++) {
            const recipient = recipients[i];
            const amount = amounts[i];
            totalAmount = totalAmount.add(amount);

            //  await stable.connect(owner).approve(contractInstance.address, amount);
        }

        const balanceBefore = await stable.balanceOf(contractInstance.address);
        await expect(contractInstance.connect(owner).distributeStable(recipients, amounts)).to.emit(contractInstance, "StableDistribution").withArgs(owner.address, recipients, amounts);
        const balanceAfter = await stable.balanceOf(contractInstance.address);

        const expectedBalance = balanceBefore.sub(totalAmount);
        expect(balanceAfter).to.equal(expectedBalance, "Contract balance not updated correctly");

    });

    it("should withdraw stable coins", async function () {
        // Recharge user
        const startCredits = await contractInstance.credits(user1.address);
        await stable.connect(user1).approve(contractInstance.address, rechargeAmount);
        await contractInstance.connect(user1).recharge(rechargeAmount);
        const beforeCredits = await contractInstance.credits(user1.address);
        // Withdraw stable coins
        const balanceBefore = await stable.balanceOf(user1.address);
        await expect(contractInstance.connect(owner).withdraw(user1.address, withdrawalAmount.mul(COEFFICIENT))).to.emit(contractInstance, "Withdrawal").withArgs(user1.address, withdrawalAmount.mul(COEFFICIENT));
        const balanceAfter = await stable.balanceOf(user1.address);
        const afterCredits = await contractInstance.credits(user1.address);
        const expectedBalance = balanceBefore.add(withdrawalAmount);

        expect(afterCredits).to.equal(beforeCredits.sub(withdrawalAmount.mul(COEFFICIENT)), "Credits are not updated correctly");

        expect(balanceAfter).to.equal(expectedBalance, "Owner balance not updated correctly");

    });

    it("should withdraw credits", async function () {
        // Recharge user
        await stable.connect(user2).approve(contractInstance.address, rechargeAmount);
        await contractInstance.connect(user2).recharge(rechargeAmount);
        let creditsBefore = [];
        for (let i = 0; i < recipients.length; i++) {
            creditsBefore.push(await contractInstance.credits(recipients[i]));
        }
        const contractBalance = await stable.balanceOf(contractInstance.address);
        // Withdraw credits
        await contractInstance.connect(owner).withdrawCredits(recipients, amounts);

        const filter = await contractInstance.filters.CreditWithdrawal();
        const events = await contractInstance.queryFilter(filter);
        expect(events.length).to.equal(recipients.length, "Wrong events number");
        
        for (let i = 0; i < recipients.length; i++) {
            const recipient = recipients[i];
            const amount = amounts[i];
            const event = events[i];
            const creditsAfter = await contractInstance.credits(recipient);

            const expectedCredits = creditsBefore[i].sub(amount);
            expect(creditsAfter).to.equal(expectedCredits, "Credits not updated correctly");

            expect(event.event).to.equal("CreditWithdrawal", "Wrong event name");
            expect(event.args).to.deep.equal([owner.address, recipient, amount]);
        }

        expect(await stable.balanceOf(contractInstance.address)).to.equal(contractBalance, "Balance of contract change");
        // Check event LATER
        
        // await expect(contractInstance.connect(owner)).to.emit(contractInstance, "CreditWithdrawal").withArgs(owner.address, recipient, amount);
    });
});

