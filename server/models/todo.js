module.exports = (sequelize, DataTypes) => {
  const ToDo = sequelize.define('ToDo', {
    subject: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATE,
  }, {});
  ToDo.associate = function (models) {
    // associations can be defined here
  };
  return ToDo;
};