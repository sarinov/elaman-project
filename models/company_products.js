'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company_Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Company_Products.belongsTo(models.Product)
            models.Company_Products.belongsTo(models.Companies)
        }
    }

    Company_Products.init({
        CompanyId: DataTypes.INTEGER,
        ProductId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Company_Products',
    });
    return Company_Products;
};