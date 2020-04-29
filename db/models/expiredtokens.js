'use strict';
module.exports = (sequelize, DataTypes) => {
  const expiredtokens = sequelize.define('expiredtokens', {
    token: DataTypes.STRING,
    expiredAt: DataTypes.DATE
  }, {});
  expiredtokens.associate = function(models) {
    // associations can be defined here
  };
  return expiredtokens;
};