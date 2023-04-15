// test/userRoutes.test.ts

import chai from 'chai';
import supertest from 'supertest';
import { describe, it } from 'mocha';
import app from '../index'; // Import your app instance

const { expect } = chai;

describe('user routes', function () {
    this.timeout(5000000);

    it('should GET all users', async () => {
        const res = await supertest(app).get('/users');
        expect(res.status).to.eq(200);
        expect(res.body).to.be.instanceOf(Array);
    });

    it('should GET a user by ID', async () => {
        const userId = 1; // Replace with an actual user ID from your test database
        const res = await supertest(app).get(`/users/${userId}`);
        expect(res.status).to.eq(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.id).to.be.eq(userId);
    });

    it('should POST a new user then DELETE it', async () => {
        const newUser = {
          wallet_address: '0x1234abcd',
          key: "my_key",
          computation_units: 0,
        };
      
        let res = await supertest(app).post('/users').send(newUser);
        expect(res.status).to.eq(201);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.wallet_address).to.be.eq(newUser.wallet_address);
        expect(res.body.key).to.be.eq(newUser.key);

        res = await supertest(app).delete(`/users/${res.body.id}`);
        expect(res.status).to.eq(204);
    });

})
