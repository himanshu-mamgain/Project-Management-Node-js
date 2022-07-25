const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');

const date = require('../Date');

const User = require("../models/user");

router.get("/login", (req, res) => {
    res.render('login', {date: date, err: ""});
});

router.post("/login", async (req, res) => {
    try {   
        const user = await User.findOne({email: req.body.email});
        if(user == null) {
            res.render('login', {err: "You are not registered, please signup to continue", date: date});
        }
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.redirect("/add%20projects");
        } else {
            res.render('login', {err: "Please enter correct password to login", date: date});
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;