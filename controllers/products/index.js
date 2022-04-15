const db = require('../../models')
const sequelize = require('sequelize')

const methods = {
    create: null,
    filterPrice: null,
    filterDate: null,
    get: null,
    getAll: null,
    getAllProdsOfCompany: null,
    update: null,
    delete: null,
    test: null,
    incrementLike: null,
    incrementDislike: null,
    decrementLike: null,
    decrementDislike: null
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
    } else {
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

methods.filterPrice = async function() {
    return await db.Product.findAll({
        order: [['price', 'DESC']],
        attributes: ['name', 'price']
    })
}

methods.filterDate = async function() {
    return await db.Product.findAll({
        order: [['createdAt', 'DESC']],
        attributes: ['name', 'createdAt']
    })
}

methods.get = async function (id) {
    const product = await db.Product.findOne({
        where: {
            id
        },
        include: [{
            model: db.Categories
        }]
    })
    return product
}

methods.getAll = async function (options) {
    const where = {};
    if(!options.orderField){
        options.orderField = 'price';
    }
    if(!options.orderType){
        options.orderType = 'desc';
    }
    if(options.categoryId){
       where.CategoryId = options.categoryId
    }
    if(options.name){
       where.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + options.name.toLowerCase() + '%')
    }
    console.log(where);
    const products = await db.Product.findAll({
        where,
        order: [[options.orderField, options.orderType]],
        include: [{
            model: db.Categories
        }]
    })
    return products
}

methods.getAllProdsOfCompany = async function (id) {
    const items = await db.Company_Products.findAll({
        where: {
            CompanyId: id
        },
        include: [{
            model: db.Product
        }],
        attributes: []
    })
    return items
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

methods.incrementLike = async function (userId, id) {
    const isLiked = await db.Likes.findOne({
        where: {
            UserId: userId,
            ProductId: id
        }
    })
    if (isLiked) {
        throw 'You have already liked this product!'
    } else {
        await db.Likes.create({
            UserId: userId, ProductId: id
        })
        const result = await db.Product.findOne({
            where: {
                id
            }
        })
        return result.increment('like')
    }
}

methods.incrementDislike = async function (userId, id) {
    const isDisliked = await db.Dislikes.findOne({
        where: {
            UserId: userId,
            ProductId: id
        }
    })
    if (isDisliked) {
        throw 'You have already disliked this product!'
    } else {
        await db.Dislikes.create({
            UserId: userId, ProductId: id
        })
        const result = await db.Product.findOne({
            where: {
                id
            }
        })
        return result.increment('dislike')
    }
}

methods.decrementLike = async function (userId, id) {
    const isLiked = await db.Likes.findOne({
        where: {
            UserId: userId,
            ProductId: id
        }
    })
    if (!isLiked) {
        throw 'You have not liked this product!'
    } else {
        await db.Likes.destroy({
            where: {
                id: isLiked.id
            }
        })
        const result = await db.Product.findOne({
            where: {
                id
            }
        })
        return result.decrement('like')
    }
}

methods.decrementDislike = async function (userId, id) {
    const isDisliked = await db.Dislikes.findOne({
        where: {
            UserId: userId,
            ProductId: id
        }
    })
    if (!isDisliked) {
        throw 'You have not disliked this product!'
    } else {
        await db.Dislikes.destroy({
            where: {
                id: isDisliked.id
            }
        })
        const result = await db.Product.findOne({
            where: {
                id
            }
        })
        return result.decrement('dislike')
    }
}

module.exports = methods;
