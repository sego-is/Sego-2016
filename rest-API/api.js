(function() {
    'use strict';

    const express = require('express');
    const jwt = require('express-jwt');
    const bodyParser = require('body-parser');

    const api = express();

    const jwtCheck = jwt({
            secret: new Buffer('LjTXpHjzAIcCZCZ4gxZWkdyU82wBrYxA-eM2HJ1u8pIgO19YbV9BjpXHo3gI9eBv', 'base64'),
            audience: 'U4WvYHgktQuwoih8m9VVrqsPmEkxghJT'
    });
    
    api.use(jwtCheck);
    
    api.get('/', (req, res) => {
            res.status(201).json({
                    hungang: 'thvag byfluga'
            });
    });

    api.get('/booking', (req, res) => {
            res.status(201).json({
                    svar: 'tippa svar'
            });
    });
    
    api.post('/booking', bodyParser.json(), (req, res) => {
       res.status(201).send(req.body);
    });
    
    module.exports = api;
})();
