const db = require('../../models')

const methods = {
    create: null,
    reply: null,
    get: null,
    getAll: null,
    update: null,
    delete: null
}

methods.create = async function (ProductId, content, UserId) {
    const result = await db.Comments.create({
        ProductId, content, UserId
    })
    return result
}

methods.reply = async function (id, content, UserId) {
    const isComment = await db.Comments.findOne({
        where: {
            id
        }
    })

    if (!isComment) {
        throw 'Comment does not found!'
    }
    else {
        const result = await db.Comments.create({
            ProductId: isComment.ProductId, content, UserId, ReplyId: id
        })
        return result
    }
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