'use strict';
const truncate = require('../test/truncate.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Bike',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brand',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gear',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Misc.',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const categories = await queryInterface.sequelize.query(
      `SELECT id from CATEGORIES;`
    );
    const categoryRows = categories[0];

    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Mountain Bike',
        type: null,
        parentId: categoryRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Road Bike',
        type: null,
        parentId: categoryRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shirts',
        type: null,
        parentId: categoryRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tools',
        type: null,
        parentId: categoryRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Items', [
      {
        name: 'Trek Domane 4.0 Disc',
        price: 100.00,
        stock: 20,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Domane AL 3',
        price: 100.00,
        stock: 3,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emonda SLR 6 H2',
        price: 100.00,
        stock: 2,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Speed Concept',
        price: 100.00,
        stock: 1,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emonda SL 5',
        price: 100.00,
        stock: 50,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emonda SL 5 WSD',
        price: 100.00,
        stock: 10,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Domane SLR F/S',
        price: 100.00,
        stock: 99,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Overpriced shirt',
        price: 100.00,
        stock: 99,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fancy Helmet',
        price: 501.00,
        stock: 99,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Crappy Helmet',
        price: 20.00,
        stock: 99,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bell Sports Air Attack High Power Air Pump',
        price: 50.00,
        stock: 99,
        descShort: 'foo',
        descLong: 'bar',
        picName: '../assets/default.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const categories2 = await queryInterface.sequelize.query(
      `SELECT id from CATEGORIES;`
    );
    const categoryRows2 = categories2[0];

    const items = await queryInterface.sequelize.query(
      `SELECT id from ITEMS;`
    );
    const itemRows = items[0];

    return await queryInterface.bulkInsert('ItemCategories', [
      {
        categoryId: categoryRows2[0].id,
        itemId: itemRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[3].id,
        itemId: itemRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[0].id,
        itemId: itemRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[1].id,
        itemId: itemRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[0].id,
        itemId: itemRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[1].id,
        itemId: itemRows[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[2].id,
        itemId: itemRows[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[4].id,
        itemId: itemRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[0].id,
        itemId: itemRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[1].id,
        itemId: itemRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[5].id,
        itemId: itemRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[1].id,
        itemId: itemRows[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[2].id,
        itemId: itemRows[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[3].id,
        itemId: itemRows[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[4].id,
        itemId: itemRows[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[4].id,
        itemId: itemRows[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[4].id,
        itemId: itemRows[10].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      truncate(),
      queryInterface.bulkDelete('ItemCategories', null, {}),
      queryInterface.bulkDelete('Items', null, {}),
    ])
  }
};
