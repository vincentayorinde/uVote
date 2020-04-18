'use strict';

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('votes', 'voter_id', {
            type: Sequelize.STRING,
            allowNull: true,
        }),

    down: (queryInterface, Sequelize) =>
        queryInterface.removeColumn('votes', 'voter_id'),
};
