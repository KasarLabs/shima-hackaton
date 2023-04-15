require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    networks: {
        hardhat: {},
        celo: {
          url: "https://forno.celo.org", // Replace with your own node endpoint
          gasPrice: 10e9,
          gas: 8000000,
          accounts: [process.env.PRIVATE],
          chainId: 42220, // Replace with the chainId of the Celo network you want to use
        },
    },
    solidity: "0.8.18",
};
