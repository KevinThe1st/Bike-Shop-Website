module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  User.hasMany(Order: {as: 'userId'});
  User.belongsTo(Address);
  return User;
};