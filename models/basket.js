'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Basket.belongsTo(models.Product);
      models.Basket.belongsTo(models.User);

    }
  }
  Basket.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Basket',
  });
  return Basket;
};