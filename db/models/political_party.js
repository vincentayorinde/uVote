'use strict';
module.exports = (sequelize, DataTypes) => {
  const political_party = sequelize.define('political_party', {
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    logo: DataTypes.STRING,
    established: DataTypes.STRING
  }, {});
  political_party.associate = function(models) {
    // associations can be defined here
    political_party.hasMany(models.candidates,{
      foreignKey: 'political_partyId',
      as: 'party',
      cascade: true,
    })
  };
  return political_party;
};