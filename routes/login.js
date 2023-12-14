const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const date = require('../Date');

const User = require("../models/user");

router.get("/login", (req, res) => {
    res.render('login', {date: date, err: ""});
});

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });
};

router.post("/login", async (req, res) => {
    try {   
        const user = await User.findOne({email: req.body.email});
        if(user == null) {
            res.render('login', {err: "You are not registered, please signup to continue", date: date});
        }
        if(await bcrypt.compare(req.body.password, user.password)) {
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
            res.cookie('userId', user._id);
            res.redirect("/add%20projects");
        } else {
            res.render('login', {err: "Please enter correct password to login", date: date});
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/logout", (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
});

module.exports = router;