"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const utils_1 = require("../utils/utils");
// Example provider data
let providers = [
    { id: 1, rpc_url: 'https://eth.llamarpc.com', chain_id: '1', performance_score: 10, computation_units: 0 },
    { id: 2, rpc_url: 'https://rpc.flashbots.net', chain_id: '1', performance_score: 4, computation_units: 0 },
    { id: 3, rpc_url: 'https://cloudflare-eth.com', chain_id: '1', performance_score: 1, computation_units: 0 },
];
describe('RPCs Ranking', () => {
    it('should rank providers based on their ping', () => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield (0, utils_1.rankRPCs)(providers);
        for (let i = 0; i < results.length; i++) {
            console.log("Provider: " + results[i].provider.rpc_url + " ping: " + results[i].time + " ms");
            if (i > 0) {
                (0, chai_1.expect)(results[i].time).to.be.gte(results[i - 1].time);
            }
        }
    }));
});
describe('getNextProvider', () => {
    it('should select provider based on their performance rank', () => {
        const selections = { 0: 0, 1: 0, 2: 0 };
        for (let i = 0; i < 900; i++) {
            const selectedProvider = (0, utils_1.getNextProvider)(providers);
            if (selectedProvider) {
                selections[selectedProvider.id - 1]++;
            }
        }
        console.log("Request to rpc with a performance score of " + providers[0].performance_score + ": " + selections[0]);
        console.log("Request to rpc with a performance score of " + providers[1].performance_score + ": " + selections[1]);
        console.log("Request to rpc with a performance score of " + providers[2].performance_score + ": " + selections[2]);
        // Expect the providers with higher performance scores to be selected more often
        (0, chai_1.expect)(selections[0]).to.be.greaterThan(selections[1]);
        (0, chai_1.expect)(selections[1]).to.be.greaterThan(selections[2]);
    });
});
