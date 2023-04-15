export const chains: string[] = [
  "polygon",
  "taiko",
  "celo",
  "gnosis",
  "filecoin",
  "mantle",
  "ethereum",
];

export type Network = {
  name: string;
  chainId: string;
};

export const networks: Network[] = [
  {
    name: "polygon",
    chainId: "137",
  },
  {
    name: "taiko",
    chainId: "11155111", // Replace with the correct chain ID
  },
  {
    name: "celo",
    chainId: "42220",
  },
  {
    name: "gnosis",
    chainId: "100", // Replace with the correct chain ID
  },
  {
    name: "filecoin",
    chainId: "314", // Replace with the correct chain ID
  },
  {
    name: "mantle",
    chainId: "5000", // Replace with the correct chain ID
  },
  {
    name: "ethereum",
    chainId: "1",
  },
];

export const generateRandomKeyHex = (min: number, max: number) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString(16);
};

export const generateRandomKey = (min: number, max: number) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};
