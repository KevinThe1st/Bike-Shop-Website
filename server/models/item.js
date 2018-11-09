'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    price: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER,
    descShort: DataTypes.STRING,
    descLong: DataTypes.STRING,
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.hasMany(models.OrderItem);
    Item.hasMany(models.ItemCategory);
  };
  return Item;
};
