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
const chai_1 = __importDefault(require("chai"));
const supertest_1 = __importDefault(require("supertest"));
const mocha_1 = require("mocha");
const index_1 = __importDefault(require("../index"));
const provider_model_1 = require("../models/provider.model");
const utils_1 = require("../utils/utils");
const { expect } = chai_1.default;
(0, mocha_1.describe)('Load balancing test', function () {
    this.timeout(5000000);
    (0, mocha_1.it)('should properly distribute transactions among RPCs based on ping times', () => __awaiter(this, void 0, void 0, function* () {
        // create new users
        let users = [];
        for (let i = 1; i <= 10; i++) {
            users.push({ id: i, wallet_address: `user${i}`, key: `key${i}`, computation_units: 0 });
        }
        const rpcRequestBody = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_blockNumber',
            params: [],
        };
        // rank providers and update their score
        let providers = yield (0, provider_model_1.getAllProviders)();
        let rankedProviders = yield (0, utils_1.rankRPCs)(providers);
        for (let provider of rankedProviders) {
            provider.provider.performance_score = Math.floor(1 / provider.time * 1000);
            yield (0, provider_model_1.updateProvider)(provider.provider.id, provider.provider);
        }
        // send 10 requests for each user
        for (const user of users) {
            let res = yield (0, supertest_1.default)(index_1.default).post('/users').send(user);
            for (let i = 0; i < 3; i++) {
                const response = yield (0, supertest_1.default)(index_1.default)
                    .post(`/1/${user.key}`)
                    .send(rpcRequestBody);
            }
            yield (0, supertest_1.default)(index_1.default).delete(`/users/${res.body.id}`);
        }
        providers = yield (0, provider_model_1.getAllProviders)();
        console.log(providers);
    }));
});
