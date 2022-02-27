'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Companies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Companies.hasMany(models.User);
            models.Companies.hasMany(models.Company_Products);
        }
    }

    Companies.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        address: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Companies',
    });
    return Companies;
};