const db = require('../../models')

const methods = {
    create: null,
    get: null,
    getAll: null,
    update: null,
    delete: null
}

methods.create = async function (name, description, address) {
    const company = await db.Companies.findOne({
        where: {
            name
        }
    })
    if (company) throw 'Company already exist'

    const result = await db.Companies.create({
        name, description, address
    })
    return result
}

methods.get = async function (id) {
    const company = await db.Companies.findOne({
        where: {
            id
        }
    })
    return company
}

methods.getAll = async function () {
    const company = await db.Companies.findAll()
    return company
}

methods.update = async function (id, name, description, address) {
    const company = await db.Companies.update({
        name, description, address
    }, {
        where: {
            id
        }
    })

    return company
}

methods.delete = async function (id) {
    const company = await db.Companies.destroy({
        where: {
            id
        }
    })

    return company
}

module.exports = methods;