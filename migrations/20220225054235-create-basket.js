'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Baskets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ProductId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                      tableName: 'Products',
                      schema: 'public'
                    },
                    key: 'id'
                }
            },
            UserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                      tableName: 'Users',
                      schema: 'public'
                    },
                    key: 'id'
                }
            },
            amount: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Baskets');
    }
};