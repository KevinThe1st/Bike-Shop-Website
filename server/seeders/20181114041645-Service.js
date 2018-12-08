'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('Services', [
        {
          name: 'Custom Bike Fittings',
          desc: 'Foxycle cyclery offers precise custom bike fittings for the avid cyclist. Prices range from $5 - $100',
          picName: '../assets/homepagenew6.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Free Tune-Up Services within the first 6 months',
          desc: 'Every bicycle sold at Foxycle includes free tune-ups and repairs within 6 months of purchase.',
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
