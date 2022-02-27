'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Comments.belongsTo(models.Product)
            models.Comments.belongsTo(models.User)
            models.Comments.belongsTo(models.Comments) // ??? хз как вытащить айди для реплайАйди
        }
    }

    Comments.init({
        productId: DataTypes.INTEGER,
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        replyId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Comments',
    });
    return Comments;
};