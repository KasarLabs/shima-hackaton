import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index';
import { createUser, User, deleteUser } from '../models/user.model';

const request = supertest(app);

describe('RPC Forwarding', () => {
    let testUser: User;
  
    // Create a test user before running the tests
    before(async () => {
        const newUser: User = {
            id: 123,
            wallet_address: 'test_wallet_address',
            key: 'test_key',
        };
        testUser = await createUser(newUser);
    });
  
    // Remove the test user after running the tests
    after(async () => {
      await deleteUser(testUser.id);
    });
  
    it('should forward RPC request with a valid user key', async () => {
        const rpcRequestBody = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_blockNumber',
            params: [],
        };
  
        const response = await request
            .post(`/blockchain/${testUser.key}`)
            .send(rpcRequestBody);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('jsonrpc');
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('result');
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
  