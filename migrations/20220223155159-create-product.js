'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            },
            amount: {
                type: Sequelize.INTEGER
            },
            like: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            dislike: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            CategoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                      tableName: 'Categories',
                      schema: 'public'
                    },
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    }
};
