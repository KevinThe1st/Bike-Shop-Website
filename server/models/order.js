'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    shippingStatus: DataTypes.STRING,
    totalPrice: DataTypes.DOUBLE,
    storePickup: DataTypes.BOOLEAN
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.hasMany(models.OrderItem);
    Order.belongsTo(model.User);
  };
  return Order;
};
