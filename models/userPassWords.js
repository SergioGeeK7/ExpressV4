var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataType) {
  var UserPassWords = sequelize.define('UserPassWords', {
    password  : {
        type: DataType.STRING
    },
    expire    : DataType.DATE
  },{
    classMethods: {
      associate: function(models) {
        UserPassWords.belongsTo(models.Users);
      }
    },
    hooks:{
        afterValidate:function (userPassword){
            userPassword.password = bcrypt.hashSync(userPassword.password,8);
        }
    },
    tableName:   'UserPassWords'
  });

  return UserPassWords;
}
