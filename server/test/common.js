var { assert, expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const truncate = require('./truncate');
const { Address, Category, Item, Order, OrderItem, User } = require('../models');

beforeEach(() => {
  return truncate();
});

after(() => {
  return User.sequelize.close();
});

module.exports = { assert, expect, request, Address, Category, Item, Order, OrderItem, User };