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
    if (user) throw 'User allready exist'

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

module.exports = methods;