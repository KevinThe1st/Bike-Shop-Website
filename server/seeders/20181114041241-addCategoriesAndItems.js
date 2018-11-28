'use strict';
const truncate = require('../test/truncate.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Category 1',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Category 2',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Category 3',
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
        name: 'Subcategory of category 1 - 1',
        type: null,
        parentId: categoryRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Subcategory of category 1 - 2',
        type: null,
        parentId: categoryRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Subcategory of category 2 - 1',
        type: null,
        parentId: categoryRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Subcategory of category 3 - 1',
        type: null,
        parentId: categoryRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Items', [
      {
        name: 'Of Category 1 and Subcategory 1 - 1',
        price: 100.00,
        stock: 5,
        descShort: 'foo',
        descLong: 'bar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Of Category 1 and Category 2',
        price: 100.00,
        stock: 5,
        descShort: 'foo',
        descLong: 'bar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Of Category 1 and Category 2 and Category 3',
        price: 100.00,
        stock: 5,
        descShort: 'foo',
        descLong: 'bar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Of Category 1 and Subcategory 1 - 2 ',
        price: 100.00,
        stock: 5,
        descShort: 'foo',
        descLong: 'bar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Of Category 2 and Subcategory 2 - 1',
        price: 100.00,
        stock: 5,
        descShort: 'foo',
        descLong: 'bar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Of Category 2',
        price: 100.00,
        stock: 5,
        descShort: 'foo',
        descLong: 'bar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Of Category 3',
        price: 100.00,
        stock: 5,
        descShort: 'foo',
        descLong: 'bar',
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
        itemId: itemRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[0].id,
        itemId: itemRows[1].id,
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
        categoryId: categoryRows2[0].id,
        itemId: itemRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[1].id,
        itemId: itemRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[2].id,
        itemId: itemRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[4].id,
        itemId: itemRows[3].id,
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
        itemId: itemRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[5].id,
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
