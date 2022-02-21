const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const routes = require(`./routes`);
const port = 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(routes);

app.listen(port, ()=> {
    console.log(`Server listen: ${port} port`)
})

app.get('/', async (req, res) => {
    console.log(req.body)
    res.send('ok');
})

app.use(async (err, req, res, next) => {
    //console.error(req.method + ' ' + req.originalUrl);
    //console.error(req.user);
    console.error(err);
    res.status(500).json(new Response().error({
        message: err.message,
        stack: err.stack
    }));
})
