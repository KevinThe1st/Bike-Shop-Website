'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    type : DataTypes.STRING,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    Address.belongsTo(models.User);
  };
  return Address;
};
