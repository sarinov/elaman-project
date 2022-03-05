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
            models.Product.hasMany(models.Basket);
            models.Product.hasMany(models.Company_Products);
            models.Product.belongsTo(models.Categories);
            models.Product.hasMany(models.Comments);
            models.Product.hasMany(models.Likes);
            models.Product.hasMany(models.Dislikes);
        }
    }

    Product.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.INTEGER,
        like: DataTypes.INTEGER,
        dislike: DataTypes.INTEGER,
        CategoryId: DataTypes.INTEGER,
        amount: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};
