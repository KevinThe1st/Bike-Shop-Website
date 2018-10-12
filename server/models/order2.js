module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
  }, {});
  Order.associate = function (models) {
    // associations can be defined here
  };
  Order.hasMany(OrderItem: {as: 'orderId'});
  return Order;
};