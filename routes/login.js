const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');

const date = require('../Date');

const User = require("../models/user");

router.get("/login", (req, res) => {
    res.render('login', {date: date});
});

router.post("/login", async (req, res) => {
    try {   
        const user = await User.findOne({email: req.body.email});
        if(user == null) {
            res.redirect("/signup");
        }
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.redirect("/add%20projects");
        } else {
            res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;