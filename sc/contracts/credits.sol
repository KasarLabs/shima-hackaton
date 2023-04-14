// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CreditContract is Ownable {
    mapping(address => uint256) public credits;

    IERC20 public stable;

    uint256 public constant COEFFICIENT = 1000;

    uint256 public totalCredits;

    event CreditRecharge(address indexed user, uint256 amount);
    event StableDistribution(address indexed owner, address[] recipients, uint256[] amounts);
    event Withdrawal(address indexed user, uint256 amount);
    event CreditWithdrawal(address indexed owner, address indexed user, uint256 amount);

    constructor(address _stable) {
        stable = IERC20(_stable);
    }

    function recharge(uint256 amount) public {
        uint256 creditsAmount = amount * COEFFICIENT;
        require(stable.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
        require(stable.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        credits[msg.sender] += creditsAmount;
        totalCredits += creditsAmount;  
        emit CreditRecharge(msg.sender, creditsAmount);
    }

    function distributeStable(address[] memory recipients, uint256[] memory amounts) public onlyOwner {
        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint256 amount = amounts[i];
            require(amount > 0, "Distribution amount must be greater than 0");
            require(stable.transfer(recipient, amount), "Distribution failed");
        }
        emit StableDistribution(owner(), recipients, amounts);
    }

    function withdraw(address payable user, uint256 amount) public onlyOwner {
        require(amount <= credits[user], "Insufficient credits to withdraw");

        uint256 stableAmount = amount / COEFFICIENT;
        credits[user] -= amount;
        totalCredits -= amount;  
        require(stable.transfer(user, stableAmount), "Withdrawal failed");
        emit Withdrawal(user, amount);
    }

    function withdrawCredits(address[] memory users, uint256[] memory amounts) public onlyOwner {
        require(users.length == amounts.length, "Users and amounts arrays must have the same length");
        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            uint256 amount = amounts[i];
            require(amount > 0, "Withdrawal amount must be greater than 0");
            require(amount <= credits[user], "Insufficient credits to withdraw");
            credits[user] -= amount;
            totalCredits -= amount;
            emit CreditWithdrawal(owner(), user, amount);
        }
    }
}
