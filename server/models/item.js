'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    price: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER,
    descShort: DataTypes.STRING,
    descLong: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};