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
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('RPC Forwarding', () => {
    it('should forward RPC request with a valid user key', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            wallet_address: 'test_wallet_address',
            key: "test_key",
            computation_units: 0,
        };
        let res = yield (0, supertest_1.default)(index_1.default).post('/users').send(newUser);
        const rpcRequestBody = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_blockNumber',
            params: [],
        };
        const response = yield request
            .post(`/1/${newUser.key}`)
            .send(rpcRequestBody);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.body).to.have.property('jsonrpc');
        (0, chai_1.expect)(response.body).to.have.property('id');
        (0, chai_1.expect)(response.body).to.have.property('result');
        const updatedUser = yield (0, supertest_1.default)(index_1.default).get(`/users/${res.body.id}`);
        yield (0, supertest_1.default)(index_1.default).delete(`/users/${res.body.id}`);
        (0, chai_1.expect)(updatedUser.body.computation_units).to.be.eq(newUser.computation_units + 1);
    }));
    it('should return 401 error for an invalid user key', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidKey = 'invalid_key';
        const rpcRequestBody = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_blockNumber',
            params: [],
        };
        const response = yield request
            .post(`/blockchain/${invalidKey}`)
            .send(rpcRequestBody);
        (0, chai_1.expect)(response.status).to.equal(401);
        (0, chai_1.expect)(response.body).to.have.property('error');
        (0, chai_1.expect)(response.body.error).to.equal('Invalid user key');
    }));
});
