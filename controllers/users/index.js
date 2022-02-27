const db = require('../../models')

const methods = {
    registration: null,
    login: null
}


methods.registration = async function (firstName, lastName, password, email) {

    const user = await db.User.findOne({
        where: {
            email
        }
    })
    if (user) throw 'User already exist'

    const result = await db.User.create({
        firstName, lastName, password, email
    })
    return result
}

methods.login = async function (password, email) {

    const user = await db.User.findOne({
        where: {
            email
        }
    })

    if (user.password !== password) {
        throw 'Incorrect password'
    }

    return user
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
