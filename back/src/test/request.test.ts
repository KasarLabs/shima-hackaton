import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index';
import { getUserById } from '../models/user.model';

const request = supertest(app);

describe('RPC Forwarding', () => {
    // Remove the test user after running the tests
    after(async () => {
    });
  
    it('should forward RPC request with a valid user key', async () => {
        const newUser = {
            wallet_address: 'test_wallet_address',
            key: "test_key",
            computation_units: 0,
        };
        
        let res = await supertest(app).post('/users').send(newUser);

        const rpcRequestBody = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_blockNumber',
            params: [],
        };
        const response = await request
            .post(`/blockchain/${newUser.key}`)
            .send(rpcRequestBody);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('jsonrpc');
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('result');

        const updatedUser = await supertest(app).get(`/users/${res.body.id}`);
        await supertest(app).delete(`/users/${res.body.id}`);
        expect(updatedUser.body.computation_units).to.be.eq(newUser.computation_units + 1);

    });
  
    it('should return 401 error for an invalid user key', async () => {
        const invalidKey = 'invalid_key';
        const rpcRequestBody = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_blockNumber',
            params: [],
        };
  
        const response = await request
            .post(`/blockchain/${invalidKey}`)
            .send(rpcRequestBody);
  
        expect(response.status).to.equal(401);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.equal('Invalid user key');
    });
  });
  