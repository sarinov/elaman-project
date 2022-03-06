const {Router} = require('express');
const router = Router();
const userController = require('../controllers/users')
const validator = require('../utils/validator')
const Response = require('../utils/ApiResponse')
const {verifyToken, isAdmin} = require('../middlewares/auth')

router

    .post('/registration', async (req, res) => {
        const {firstName, lastName, password, email} = req.body;

        if (!firstName || typeof firstName != 'string' || firstName.length > 40) {
            return res.status(400).send(new Response().error('Incorrect first name!'));
        }
        if (!lastName || typeof lastName != 'string' || lastName.length > 40) {
            return res.status(400).send(new Response().error('Incorrect lastName!'));
        }
        if (!password || typeof password != 'string' || password.length < 5) {
            return res.status(400).send(new Response().error('Incorrect password!'));
        }
        if (!email || typeof email != 'string' || !validator.validateEmail(email)) {
            return res.status(400).send(new Response().error('Incorrect email!'));
        }
        try {
            const result = await userController.registration(firstName, lastName, password, email);
            res.status(201).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .post('/registration/admin', verifyToken, isAdmin, async (req, res) => {
        const {firstName, lastName, password, email} = req.body;

        if (!firstName || typeof firstName != 'string' || firstName.length > 40) {
            return res.status(400).send(new Response().error('Incorrect first name!'));
        }
        if (!lastName || typeof lastName != 'string' || lastName.length > 40) {
            return res.status(400).send(new Response().error('Incorrect lastName!'));
        }
        if (!password || typeof password != 'string' || password.length < 5) {
            return res.status(400).send(new Response().error('Incorrect password!'));
        }
        if (!email || typeof email != 'string' || !validator.validateEmail(email)) {
            return res.status(400).send(new Response().error('Incorrect email!'));
        }
        try {
            const result = await userController.registration(firstName, lastName, password, email, 'admin');
            res.status(201).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

    .post('/login', async (req, res) => {
        const {password, email} = req.body;

        if (!password || typeof password != 'string' || password.length < 5) {
            return res.status(400).send(new Response().error('Incorrect password!'));
        }
        if (!email || typeof email != 'string' || !validator.validateEmail(email)) {
            return res.status(400).send(new Response().error('Incorrect email!'));
        }
        try {
            const result = await userController.login(password, email);
            res.status(201).send(new Response().data(result));
        } catch (err) {
            res.status(500).send(new Response().error(err.message || err));
        }
    })

module.exports = router;