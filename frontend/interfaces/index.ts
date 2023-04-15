export type Node = {
  id: number;
  network: string;
  rpc?: string;
};

export interface Dapp {
  network: string;
  nom: string;
  user_id: number;
  url: string;
}

export interface Provider {
  id: number;
  rpc_url: string;
  chain_id: string;
  performance_score: number;
  computation_units: number;
}

export interface User {
  id: number;
  wallet_address: string;
  key: string;
  computation_units: number;
}
