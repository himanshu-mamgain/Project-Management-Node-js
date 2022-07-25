const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');

const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(!err) {
                console.log(decodedToken);
                next();
            } else {
                console.log(err);
                res.redirect('/login');
            }
        });
    } else {
        res.redirect('/login');
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if(!err) {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; 
                next();
            } else {
                console.log(err);
                res.locals.user = null;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = {checkAuth, checkUser};