'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Company_Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            CompanyId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                      tableName: 'Companies',
                      schema: 'public'
                    },
                    key: 'id'
                }
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
            amount: {
                type: Sequelize.INTEGER
                // ??? хотел сделать чтобы эмаунт брался из таблицы продукт, но выдает ошибку
                // в целевой внешней таблице "Products" нет ограничения уникальности,
                // соответствующего данным ключам
                // references: {
                //     model: {
                //         tableName: 'Products',
                //         schema: 'public'
                //     },
                //     key: 'amount'
                // }
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
        await queryInterface.dropTable('Company_Products');
    }
};