const db = require('../../models')


const methods = {
    create: null,
    get: null,
    getAll: null,
    update: null,
    delete: null
}

methods.create = async function (name, description, price, amount) {
    const product = await db.Product.findOne({
        where: {
            name
        }
    })
    if (product) throw 'Product already exist'

    const result = await db.Product.create({
        name, description, price, amount
    })
    return result
}

methods.get = async function (id) {
    const product = await db.Product.findOne({
        where: {
            id
        }
    })
    return product
}

methods.getAll = async function () {
    const products = await db.Product.findAll()
    return products
}

methods.update = async function (id, name, description, price, amount) {

    const product = await db.Product.update({
        name: name,
        description: description,
        price: price,
        amount: amount
    }, {
        where: {
            id
        }
    })

    return product
}

methods.delete = async function (id) {

    const product = await db.Product.destroy({
        where: {
            id
        }
    })

    return product
}

module.exports = methods;
