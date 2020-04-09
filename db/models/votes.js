'use strict';
module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    count: DataTypes.INTEGER
  }, {});
  votes.associate = function(models) {
    // associations can be defined here
    votes.belongsTo(models.candidates);
    votes.belongsTo(models.voters);
  };
  return votes;
};