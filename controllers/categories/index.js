const db = require('../../models')

const methods = {
    create: null,
    get: null,
    getAll: null,
    update: null,
    delete: null
}

methods.create = async function (name) {
    const category = await db.Categories.findOne({
        where: {
            name
        }
    })
    if (category) throw 'Category already exist'

    const result = await db.Categories.create({
        name
    })
    return result
}

methods.get = async function (id) {
    const category = await db.Categories.findOne({
        where: {
            id
        }
    })
    return category
}

methods.getAll = async function () {
    const category = await db.Categories.findAll()
    return category
}

methods.update = async function (id, name) {
    const category = await db.Categories.update({
        name
    }, {
        where: {
            id
        }
    })

    return category
}

methods.delete = async function (id) {
    const category = await db.Categories.destroy({
        where: {
            id
        }
    })

    return category
}

module.exports = methods;