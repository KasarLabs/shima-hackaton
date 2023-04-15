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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankRPCs = exports.getNextProvider = void 0;
const ping_1 = __importDefault(require("ping"));
const greatestCommonDivisor = (a, b) => {
    if (b === 0) {
        return a;
    }
    return greatestCommonDivisor(b, a % b);
};
const gcd = (a, b) => {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
};
let currentWeight = 0;
let currentIndex = -1;
const getNextProvider = (providers) => {
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
exports.getNextProvider = getNextProvider;
const rankRPCs = (providers) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    for (const provider of providers) {
        try {
            const pingResult = yield ping_1.default.promise.probe(provider.rpc_url.replace('https://', ''));
            if (pingResult.alive && typeof pingResult.time == "number") {
                results.push({ provider: provider, time: pingResult.time });
            }
        }
        catch (error) {
            console.error(`Error pinging ${provider.rpc_url}: ${error.message}`);
        }
    }
    results.sort((a, b) => a.time - b.time);
    return results;
});
exports.rankRPCs = rankRPCs;
