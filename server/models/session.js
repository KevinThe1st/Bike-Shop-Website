'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    expiration: DataTypes.DATE
  }, {});
  Session.associate = function(models) {
    Session.belongsTo(models.User);
  };
  return Session;
};