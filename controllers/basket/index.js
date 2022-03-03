const db = require('../../models')

const methods = {
    create: null,
    get: null,
    getAll: null,
    update: null,
    delete: null
}

methods.create = async function (ProductId, UserId, amount) {
    
    const result = await db.Basket.create({
        ProductId, UserId, amount
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

methods.getAll = async function (UserId) {
    const category = await db.Basket.findAll({
        where: { UserId },
        include: [{
            model: db.Product
        }],
        attributes: ['id', 'amount', 'Product.name']

    })
    return category
}

methods.update = async function (id, name, description) {
    const category = await db.Categories.update({
        name, description
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