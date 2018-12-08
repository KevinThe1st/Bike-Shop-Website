var { assert, expect } = require('chai').use(require('chai-subset'));
const app = require('../app');
const request = require('supertest')(app);
const truncate = require('./truncate');
const { Address, Category, Item, Order, OrderItem, Service, Textbox, User } = require('../models');

beforeEach(() => {
  return truncate();
});

after(() => {
  return User.sequelize.close();
});

module.exports = { assert, expect, request, Address, Category, Item, Order, OrderItem, Service, Textbox, User };