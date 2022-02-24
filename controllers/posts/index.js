const methods = {
    get: null,
    save: null,
    delete: null,
    update: null
}


methods.get = function (req, res) {
    console.log(req.body);
}

module.exports = methods;
