const db = require('../../models')

const methods = {
    create: null,
    buy: null,
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

methods.buy = async function (id) {
    const inBasket = await db.Basket.findOne({
        where: {
            id
        }
    })

    if (!inBasket) {
        throw 'This record does not exist in your basket'
    }
    else {
        const result = await db.Basket.update({
            IsBuy: true
        }, {
            where: {
                id
            }
        })
        return result
    }
}

methods.get = async function (id) {
    const result = await db.Basket.findOne({
        where: {
            id
        }
    })
    return result
}

methods.getAll = async function (UserId) {
    const result = await db.Basket.findAll({
        where: {UserId},
        include: [{
            model: db.Product
        }],
        attributes: ['id', 'amount', 'Product.name']

    })
    return result
}

methods.update = async function (id, amount) {
    const result = await db.Basket.update({
        amount
    }, {
        where: {
            id
        }
    })

    return result
}

methods.delete = async function (id) {
    const result = await db.Basket.destroy({
        where: {
            id
        }
    })

    return result
}

module.exports = methods;