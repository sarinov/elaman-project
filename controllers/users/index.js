const db = require('../../models')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt')
const secret = require('../../config/config.json').secret

const methods = {
    registration: null,
    login: null
}


methods.registration = async function (firstName, lastName, password, email, role = 'user') {

    const user = await db.User.findOne({
        where: {
            email
        }
    })
    if (user) throw 'User already exist'

    const result = await db.User.create({
        firstName, lastName, password, email, role
    })
    return result
}

methods.login = async function (password, email) {
    const user = await db.User
      .findOne({
        where: {
          email: email
        }
      })

    if (!user) {
        throw {
            success: false,
            message: 'Authentication failed. User not found.',
        };
    }
    const passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );
    if (passwordIsValid) {
        var token = jwt.sign(JSON.parse(JSON.stringify(user)), secret, {expiresIn: 86400 * 30});
        jwt.verify(token, secret, function(err, data){
            console.log(err, data);
        })
        return  {success: true, token};
    }
    else {
        throw {success: false, message: 'Authentication failed. Wrong password.'};
    }
}

// methods.test = async function () {
//
//     const user = await db.Basket.findAll({
//         where:{
//             UserId: 1
//         },
//         include: [
//         {
//             model: db.Product
//
//         }],
//         attributes:['Product.name']
//
//     })
//
//     return user
// }

module.exports = methods;
