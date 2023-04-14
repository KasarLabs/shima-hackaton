import { Provider } from '../models/provider.model';
import ping from 'ping';

const greatestCommonDivisor = (a: number, b: number): number => {
    if (b === 0) {
      return a;
    }
    return greatestCommonDivisor(b, a % b);
};
  
const gcd = (a: number, b: number): number => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

let currentWeight = 0;
let currentIndex = -1;

export const getNextProvider = (providers: Provider[]): Provider | null => {
    if (providers.length === 0) {
        return null;
      }
      const n = providers.length;
      while (true) {
        currentIndex = (currentIndex + 1) % n;
        if (currentIndex === 0) {
          currentWeight = currentWeight - 3;
          if (currentWeight < 0) {
            currentWeight = Math.max(...providers.map((provider) => provider.performance_score));
          }
        }
        if (providers[currentIndex].performance_score >= currentWeight + 1) {
          return providers[currentIndex];
        }
      }
};

export const rankRPCs = async (providers: Provider[]): Promise<{provider: Provider, time: number}[]> => {
    const results: { provider: Provider, time: number }[] = [];

    for (const provider of providers) {
        try {
            const pingResult = await ping.promise.probe(provider.rpc_url.replace('https://', ''));
            if (pingResult.alive && typeof pingResult.time == "number") {
                results.push({ provider: provider, time: pingResult.time });
            }
        } catch (error: any) {
            console.error(`Error pinging ${provider.rpc_url}: ${error.message}`);
        }
    }

    results.sort((a, b) => a.time - b.time);

    return results;
}