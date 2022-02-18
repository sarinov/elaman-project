const db = require('../../models')

const methods = {
    registration: null
}


methods.registration = async function (firstName, lastName, password, email) {
    const user = await db.User.create({
        firstName, lastName, password, email
    })
    console.log(user);
}