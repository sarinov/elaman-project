'use strict';
const bcrypt = require('bcrypt')
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(models.Basket);
            models.User.belongsTo(models.Companies);
            models.User.hasMany(models.Comments);

        }
    }

    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        CompanyId: DataTypes.INTEGER,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });

    User.beforeSave((user, options) => {
        if (user.changed('password')) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
      });

    return User;
};