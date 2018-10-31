var { assert, expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const truncate = require('./truncate');
const {User, Item} = require('../models');

beforeEach(() => {
  truncate();
});

after(() => {
  return User.sequelize.close();
});

module.exports = {assert, expect, request, User, Item};