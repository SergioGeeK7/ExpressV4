module.exports = function(sequelize, DataType) {
  var Pictures = sequelize.define('Pictures', {
    url       : DataType.STRING,
    isProfile : DataType.BOOLEAN
  },{
    classMethods: {
      associate: function(models) {
          //Pictures.hasMany(models.UserPassport, {foreignKey: 'user_id'});
          //Pictures.hasOne(models.UserPassWords);
      }
    },
    tableName:   'Pictures',
  });

  return Pictures;
}
