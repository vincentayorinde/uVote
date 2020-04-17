'use strict';

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.addColumn('candidates', 'display_picture', {
            type: Sequelize.STRING,
            allowNull: true,
        }),

    down: (queryInterface, Sequelize) =>
        queryInterface.removeColumn('candidates', 'display_picture'),
};
