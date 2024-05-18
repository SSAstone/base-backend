import jwt from 'jsonwebtoken';
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
    test('should get all users', async () => {
        const token = jwt.sign({ id: 'testUserId' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        const res = await request(app)
            .get('/user')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });
});
