const request = require('supertest');
const app = require('../server.js');
const User = require('../models/user.model.js');
const _ = require('lodash');

describe('user endpoints', () => {
  describe('POST /users', () => {
    it('should return 201 with a valid payload', async () => {
      await request(app).post('/users')
        .send({name: 'john doe', email: 'john.doe@gmail.com', password: 'admin123786876786'})
        .expect(201)
        .then(res => {
          expect(res.body).toHaveProperty('id')
        })
    })

    it('should return 422 with an empty payload', async () => {
      await request(app).post('/users').send({}).expect(422)
    })
  })
});
