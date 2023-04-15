import { expect } from 'chai';
import { Provider } from '../models/provider.model';
import { getNextProvider, rankRPCs } from '../utils/utils';


// Example provider data
let providers: Provider[] = [
    { id: 1, rpc_url: 'https://eth.llamarpc.com', performance_score: 10, computation_units: 0 },
    { id: 2, rpc_url: 'https://rpc.flashbots.net', performance_score: 4, computation_units: 0 },
    { id: 3, rpc_url: 'https://cloudflare-eth.com', performance_score: 1, computation_units: 0 },
];

describe('RPCs Ranking', () => {
    it('should rank providers based on their ping', async () => {
        const results: { provider: Provider, time: number }[] = await rankRPCs(providers);
        for (let i = 0; i < results.length; i++) {
            console.log("Provider: " + results[i].provider.rpc_url + " ping: " + results[i].time + " ms");
            if (i > 0) {
                expect(results[i].time).to.be.gte(results[i - 1].time);
            }
        }
    });
});

describe('getNextProvider', () => {
    it('should select provider based on their performance rank', () => {
      const selections: Record<number, number> = { 0: 0, 1: 0, 2: 0 };
  
      for (let i = 0; i < 900; i++) {
        const selectedProvider = getNextProvider(providers);
        if (selectedProvider) {
          selections[selectedProvider.id - 1]++;
        }
      }
      console.log("Request to rpc with a performance score of " + providers[0].performance_score + ": " + selections[0]);
      console.log("Request to rpc with a performance score of " + providers[1].performance_score + ": " + selections[1]);
      console.log("Request to rpc with a performance score of " + providers[2].performance_score + ": " + selections[2]);
      
      // Expect the providers with higher performance scores to be selected more often
      expect(selections[0]).to.be.greaterThan(selections[1]);
      expect(selections[1]).to.be.greaterThan(selections[2]);
    });
});

