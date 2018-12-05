const { User, Address, Item, Order, OrderItem, Session, Category, ItemCategory, Textbox} = require('../models');
const { Op } = require('sequelize');
const models = [User, Address, Item, Order, OrderItem, Session, Category, ItemCategory, Textbox];

module.exports = function truncate() {
  return Promise.all(
    models.reverse().map(model =>
      model.destroy({
        where: {},
        force: true
      })
    )
  ).then(() => {
    return Category.destroy({ where: { parentId: { [Op.not]: null } } });
  }).then(() => {
    return Category.destroy({ where: {} });
  })
};
