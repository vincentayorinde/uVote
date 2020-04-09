'use strict';
module.exports = (sequelize, DataTypes) => {
  const candidates = sequelize.define('candidates', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    manifesto: DataTypes.TEXT,
    gender: DataTypes.STRING
  }, {});
  candidates.associate = function(models) {
    // associations can be defined here
    candidates.belongsTo(models.political_party)
    candidates.hasMany(models.votes)
  };
  return candidates;
};