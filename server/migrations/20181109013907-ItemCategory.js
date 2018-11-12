'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ItemCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        allowNull: true
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Items',
          key: 'id'
        },
        allowNull: true
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ItemCategories');
  }
};
