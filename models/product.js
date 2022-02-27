'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Product.hasMany(models.Basket);
            models.Product.hasOne(models.Company_Products);
            models.Product.hasOne(models.Categories);
            models.Product.hasMany(models.Comments);

        }
    }

    Product.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.INTEGER,
        like: DataTypes.INTEGER,
        dislike: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        amount: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};
