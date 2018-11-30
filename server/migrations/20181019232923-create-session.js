module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expiration: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'Users',
          key: 'id',
        }, 
        onDelete: 'cascade'
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sessions');
  }
};
