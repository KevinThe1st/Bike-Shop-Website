'use strict';

// const { User, Session, Address, Order } = require('../models');
//
// const models = [Address, Session, User, Order];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: 'password',
        lastName: 'Fox',
        firstName: 'John',
        type: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {}),
      queryInterface.bulkInsert('Users', [{
        username: 'emp',
        password: 'password',
        lastName: 'Rotten',
        firstName: 'Robbie',
        type: 'Employee',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {}),
      queryInterface.bulkInsert('Users', [{
        username: 'test@test.com',
        password: 'password',
        lastName: 'Jobs',
        firstName: 'Steve',
        type: 'Customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {}),
  ]);
},

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      // models.map(model =>
      //   model.destroy({
      //     where: {},
      //     force: true
      //   })
      // )
      queryInterface.bulkDelete('Sessions', null, {}),
      queryInterface.bulkDelete('Users', null, {})
    ]);
  }
};
