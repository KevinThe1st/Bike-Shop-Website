const models = require('../models');

module.exports = function truncate() {
  return Promise.all(
    Object.keys(models).map((key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return models[key].destroy({
        where: {},
        force: true,
      });
    }),
  );
};