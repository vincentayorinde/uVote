'use strict';
module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    count: DataTypes.INTEGER
  }, {});
  votes.associate = function(models) {
    // associations can be defined here
    votes.belongsTo(models.candidates,{
      foreignKey: 'candidatesId',
      as: 'candidate',
      cascade: true,
    });
    votes.belongsTo(models.voters,{
      foreignKey: 'votersId',
      as: 'vote',
      cascade: true,
    });
  };
  return votes;
};