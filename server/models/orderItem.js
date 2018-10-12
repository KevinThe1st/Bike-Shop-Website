module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    price: DataTypes.DOUBLE,
    qty: DataTypes.INTEGER,
  }, {});
  OrderItem.associate = function (models) {
    // associations can be defined here
  };
  return OrderItem;
};