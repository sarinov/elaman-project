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
        }
    }

    Comments.init({
        ProductId: DataTypes.INTEGER,
        content: DataTypes.STRING,
        UserId: DataTypes.INTEGER,
        ReplyId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Comments',
    });
    return Comments;
};