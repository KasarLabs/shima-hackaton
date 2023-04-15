import chai from 'chai';
import supertest from 'supertest';
import { describe, it } from 'mocha';
import app from '../index';
import { User } from '../models/user.model';
import { getAllProviders, updateProvider } from '../models/provider.model';
import { rankRPCs } from '../utils/utils';

const { expect } = chai;

describe('Load balancing test', function () {
    this.timeout(5000000);
    it('should properly distribute transactions among RPCs based on ping times', async () => {

        // create new users
        let users: User[] = [];
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
        let providers = await getAllProviders();
        let rankedProviders = await rankRPCs(providers);
        for (let provider of rankedProviders) {
            provider.provider.performance_score = Math.floor(1 / provider.time * 1000);
            await updateProvider(provider.provider.id, provider.provider);
        }

        // send 10 requests for each user
        for (const user of users) {
            let res = await supertest(app).post('/users').send(user);
            for (let i = 0; i < 3; i++) {
                const response = await supertest(app)
                    .post(`/blockchain/${user.key}`)
                    .send(rpcRequestBody);
            }
            await supertest(app).delete(`/users/${res.body.id}`);
        }
        providers = await getAllProviders();
        console.log(providers);
    });
})
