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
const { expect } = chai_1.default;
(0, mocha_1.describe)('Provider routes', function () {
    this.timeout(5000000);
    (0, mocha_1.it)('should get the next provider', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/next-provider');
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('rpc_url');
        expect(res.body).to.have.property('performance_score');
    }));
    (0, mocha_1.it)('should rank providers based on ping time', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/rank-providers');
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((result) => {
            expect(result).to.have.property('provider');
            expect(result.provider).to.have.property('id');
            expect(result.provider).to.have.property('rpc_url');
            expect(result.provider).to.have.property('performance_score');
            expect(result).to.have.property('time');
        });
    }));
    (0, mocha_1.it)('should GET all providers', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/providers');
        expect(res.status).to.eq(200);
        expect(res.body).to.be.instanceOf(Array);
    }));
    (0, mocha_1.it)('should GET a provider by ID', () => __awaiter(this, void 0, void 0, function* () {
        const providerId = 1; // Replace with an actual provider ID from your test database
        const res = yield (0, supertest_1.default)(index_1.default).get(`/providers/${providerId}`);
        expect(res.status).to.eq(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.id).to.be.eq(providerId);
    }));
    (0, mocha_1.it)('should POST a new provider then DELETE it', () => __awaiter(this, void 0, void 0, function* () {
        const newProvider = {
            rpc_url: 'https://testprovider.testing.com',
            chain_id: '1',
            performance_score: 5,
            computation_units: 0,
        };
        let res = yield (0, supertest_1.default)(index_1.default).post('/providers').send(newProvider);
        expect(res.status).to.eq(201);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.rpc_url).to.be.eq(newProvider.rpc_url);
        expect(res.body.performance_score).to.be.eq(newProvider.performance_score);
        res = yield (0, supertest_1.default)(index_1.default).delete(`/providers/${res.body.id}`);
        expect(res.status).to.eq(204);
    }));
});
