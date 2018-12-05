'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('Services', [
        {
          name: 'Get your bike serviced',
          desc: 'Get your trusty little companion thoroughly serviced. Prices range from $5 - $100',
          picName: '../assets/homepagenew6.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Free tune-up',
          desc: 'Every bicycle sold at Foxycle includes a free tune-up within 6 months of purchase.',
          picName: '../assets/servicesMan.png',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {}),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Services', null, {}),
    ]);
  }
};
