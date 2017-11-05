const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

//  Server config
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//  TODO: use an api key or jwt better than this check
app.use((req, res, next) => {
    if (req.headers.host !== 'back:3001') {
        const err = new Error('Request not valid');
        return next(err);
    }

    return next();
});

app.get('/', function(req, res, next) {
    return res.send({
        status: 'ok',
    });
});


//Generic error
app.get('*', (req, res, next) => {
    const err = new Error('API endpoint not found, check your request');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
        error: {
            status: err.status,
            message: err.message
        }
    });
});

app.listen(PORT, () => console.warn('API Server started on port', PORT));
