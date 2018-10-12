module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    street: DataTypes.STRING,
    state: DataTypes.STRING,
	zip: DataTypes.STRING,
  }, {});
  Address.associate = function (models) {
    // associations can be defined here
  };
  return Address;
};