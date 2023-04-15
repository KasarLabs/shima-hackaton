"use strict";
// test/userRoutes.test.ts
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
const index_1 = __importDefault(require("../index")); // Import your app instance
const { expect } = chai_1.default;
(0, mocha_1.describe)('user routes', function () {
    this.timeout(5000000);
    (0, mocha_1.it)('should GET all users', () => __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/users');
        expect(res.status).to.eq(200);
        expect(res.body).to.be.instanceOf(Array);
    }));
    (0, mocha_1.it)('should GET a user by ID', () => __awaiter(this, void 0, void 0, function* () {
        const userId = 1; // Replace with an actual user ID from your test database
        const res = yield (0, supertest_1.default)(index_1.default).get(`/users/${userId}`);
        expect(res.status).to.eq(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.id).to.be.eq(userId);
    }));
    (0, mocha_1.it)('should POST a new user then DELETE it', () => __awaiter(this, void 0, void 0, function* () {
        const newUser = {
            wallet_address: '0x1234abcd',
            key: "my_key",
            computation_units: 0,
        };
        let res = yield (0, supertest_1.default)(index_1.default).post('/users').send(newUser);
        expect(res.status).to.eq(201);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.wallet_address).to.be.eq(newUser.wallet_address);
        expect(res.body.key).to.be.eq(newUser.key);
        res = yield (0, supertest_1.default)(index_1.default).delete(`/users/${res.body.id}`);
        expect(res.status).to.eq(204);
    }));
});
