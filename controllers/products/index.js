const db = require('../../models')


const methods = {
    create: null,
    get: null,
    getAll: null,
    update: null,
    delete: null,
    test: null,
    incrementLike: null
}

methods.create = async function (name, description, price, amount, CategoryId, CompanyId) {
    let ProductId = null;
    let product = await db.Product.findOne({
        where: {
            name
        }
    })
    if (product) {
        ProductId = product.id
    }
    else{
        product = await db.Product.create({
            name, description, price, amount, CategoryId,
        })
        ProductId = product.id
    }
   
    await db.Company_Products.findOrCreate({
        where: {
            CompanyId, ProductId
        },
        defaults: {
            CompanyId, ProductId
        }
    })
    return product
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
        name, description, price, amount
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

// TEST

methods.test = async function () {
    const product = await db.Product.findAll({
        include: [
        {
            model: db.Categories
        }],
        attributes:['id','name','description', 'Category.name']
    })
    return product
}

methods.incrementLike = async function (id) {
    const product = await db.Product.findOne({
        where: {
            id
        }
    })

    return product.increment('like')
}

module.exports = methods;
