module.exports = function(sequelize, DataType) {
  var UserPassWords = sequelize.define('UserPassWords', {
    password  : DataType.STRING,
    expire    : DataType.DATE
  },{
    classMethods: {
      associate: function(models) {
        UserPassWords.belongsTo(models.Users);
      }
    },
    tableName:   'UserPassWords'
  });

  return UserPassWords;
}
