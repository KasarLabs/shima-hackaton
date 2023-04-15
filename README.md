# Shima

Shima is a decentralized application that enables users to become blockchain RPC providers and get paid for their contributions. By distributing requests across multiple providers based on their performance, Shima ensures a smooth and optimal user experience while promoting decentralization.

## Features

- Decentralized network of blockchain RPC providers
- Load balancing across multiple RPC providers
- Automated provider selection based on performance
- Secure handling of user API keys
- Payments handling for users and RPC providers

## Goal

Shima's goal is to decentralize the usage of blockchain RPCs by allowing anyone to become an RPC provider and get paid for their service. This approach aims to distribute the responsibility of maintaining and providing RPC services across a larger network of individuals, thereby improving the overall stability and accessibility of the blockchain infrastructure. By incentivizing users to become providers, Shima aims to create a more robust and resilient system for accessing blockchain data and services.

## Frontend 

The frontend file is a React website that provides two main functionalities: provider and user. As a provider, users can host their nodes and offer access to them to other users in exchange for credits. As a user, users can create projects, which give them access to a RPC endpoint. If a user needs more requests than what is given for free, they can purchase credits on this interface.

## Back

The backend file contains the database structure and the API for the Shima project. It uses a PostgreSQL database to store user data and project information. The API provides endpoints for user authentication, project creation, and providers.

## SC (Smart Contract)

The smart contract file contains smart contract who manages payment system for Shima. It allows users to purchase credits using cryptocurrency and distributes credits to providers. The smart contract also includes tests and scripts for managing the contract.

## Contributing

Contributions to Shima are welcome! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request. Before submitting a pull request, please make sure that your code follows the established coding standards and that all tests pass.
