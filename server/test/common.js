var { assert, expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const truncate = require('./truncate');
const { Category, Item, Order, User } = require('../models');

beforeEach(() => {
  truncate();
});

after(() => {
  return User.sequelize.close();
});

module.exports = { assert, expect, request, Category, Item, Order, User };