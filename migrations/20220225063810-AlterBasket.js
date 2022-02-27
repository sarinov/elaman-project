'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Baskets', 'isBuy', {
                    type: Sequelize.DataTypes.BOOLEAN
                }, {transaction: t})
            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.removeColumn('Baskets', 'isBuy', {transaction: t}),
            ]);
        });
    }
};
