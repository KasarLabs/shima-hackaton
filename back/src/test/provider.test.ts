import chai from 'chai';
import supertest from 'supertest';
import { describe, it } from 'mocha';
import app from '../index';

const { expect } = chai;

describe('Provider routes', function () {
    this.timeout(5000000);
    it('should get the next provider', async () => {
        const res = await supertest(app).get('/next-provider');
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('rpc_url');
        expect(res.body).to.have.property('performance_score');
    });

    it('should rank providers based on ping time', async () => {
        const res = await supertest(app).get('/rank-providers');
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((result: any) => {
            expect(result).to.have.property('provider');
            expect(result.provider).to.have.property('id');
            expect(result.provider).to.have.property('rpc_url');
            expect(result.provider).to.have.property('performance_score');
            expect(result).to.have.property('time');
        })
    });

    it('should GET all providers', async () => {
        const res = await supertest(app).get('/providers');
        expect(res.status).to.eq(200);
        expect(res.body).to.be.instanceOf(Array);
    });

    it('should GET a provider by ID', async () => {
        const providerId = 1; // Replace with an actual provider ID from your test database
        const res = await supertest(app).get(`/providers/${providerId}`);
        expect(res.status).to.eq(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.id).to.be.eq(providerId);
    });

    it('should POST a new provider then DELETE it', async () => {
        const newProvider = {
          rpc_url: 'https://testprovider.testing.com',
          performance_score: 5,
          computation_units: 0,
        };
      
        let res = await supertest(app).post('/providers').send(newProvider);
        expect(res.status).to.eq(201);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body.rpc_url).to.be.eq(newProvider.rpc_url);
        expect(res.body.performance_score).to.be.eq(newProvider.performance_score);

        res = await supertest(app).delete(`/providers/${res.body.id}`);
        expect(res.status).to.eq(204);
    });

})
