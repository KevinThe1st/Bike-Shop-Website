'use strict';
module.exports = (sequelize, DataTypes) => {
  const ItemCategory = sequelize.define('ItemCategory', {
  }, {});
  ItemCategory.associate = function(models) {
    // associations can be defined here
    ItemCategory.belongsTo(models.Item);
    ItemCategory.belongsTo(models.Category);
  };
  return ItemCategory;
};
