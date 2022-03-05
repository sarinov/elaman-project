'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Dislikes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Dislikes.belongsTo(models.User);
            models.Dislikes.belongsTo(models.Product);
        }
    }

    Dislikes.init({
        UserId: DataTypes.INTEGER,
        ProductId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Dislikes',
    });
    return Dislikes;
};