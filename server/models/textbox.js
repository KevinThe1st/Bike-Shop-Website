'use strict';
module.exports = (sequelize, DataTypes) => {
  const Textbox = sequelize.define('Textbox', {
    name: DataTypes.STRING,
    text: DataTypes.STRING
  }, {});
  Textbox.associate = function(models) {
    // associations can be defined here
  };
  return Textbox;
};