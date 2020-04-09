'use strict';
module.exports = (sequelize, DataTypes) => {
    const candidates = sequelize.define(
        'candidates',
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            manifesto: DataTypes.TEXT,
            gender: DataTypes.STRING,
        },
        {}
    );
    candidates.associate = function (models) {
        // associations can be defined here
        candidates.belongsTo(models.political_party, {
            foreignKey: 'political_partyId',
            as: 'party',
        });
        candidates.hasMany(models.votes, {
            foreignKey: 'candidatesId',
            as: 'vote',
        });
    };
    return candidates;
};
