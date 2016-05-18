module.exports = function(sequelize, DataType) {
  var User = sequelize.define('Users', {
    email     : DataType.STRING,
    firstName : DataType.STRING,
    lastName  : DataType.STRING
  },{
    classMethods: {
      associate: function(models) {
          //User.hasMany(models.UserPassport, {foreignKey: 'user_id'});
          User.hasOne(models.UserPassWords);
      }
    },
    instanceMethods: {
      name: function() {
        return [this.first_name, this.last_name].join(' ');
      }
    },
    tableName:   'Users',
  });

  return User;
}
