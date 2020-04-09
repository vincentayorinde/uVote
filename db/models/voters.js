'use strict';
module.exports = (sequelize, DataTypes) => {
    const voters = sequelize.define(
        'voters',
        {
            voter_id: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            gender: DataTypes.STRING,
            dob: DataTypes.STRING,
            occupation: DataTypes.STRING,
        },
        {}
    );
    voters.associate = function (models) {
        // associations can be defined here
        voters.hasOne(models.votes, {
            foreignKey: 'votersId',
            as: 'voter',
        });
    };
    return voters;
};
