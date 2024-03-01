import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
})
afterEach(async () => {
    await mongoose.connection.close();
})

describe('User', () => {
    test('should create a new user', async () => {
        let res = await request(app).get('/user')
        expect(res.status).toBe(200)
    })
})