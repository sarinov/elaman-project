const db = require('../../models')

const methods = {
    create: null,
    get: null,
    getAll: null,
    update: null,
    delete: null
}

methods.create = async function (productId, content, userId, replyId) {
    const result = await db.Comments.create({
        productId, content, userId, replyId
    })
    return result
}

methods.get = async function (id) {
    const comment = await db.Comments.findOne({
        where: {
            id
        }
    })
    return comment
}

methods.getAll = async function () {  
    return  await db.Comments.findAll()    
}

methods.update = async function (id, productId, content, userId, replyId) {
    const comment = await db.Comments.update({
        productId, content, userId, replyId
    }, {
        where: {
            id
        }
    })

    return comment
}

methods.delete = async function (id) {
    const comment = await db.Comments.destroy({
        where: {
            id
        }
    })

    return comment
}

module.exports = methods;