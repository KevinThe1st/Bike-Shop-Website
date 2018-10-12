module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
	price: DataTypes.DOUBLE,
    desc: DataTypes.STRING,
    stock: DataTypes.INTEGER,
  }, {});
  Item.associate = function (models) {
    // associations can be defined here
	Item.belongsToMany(Order, {through: 'OrderItem'});
  };
  return Item;
};