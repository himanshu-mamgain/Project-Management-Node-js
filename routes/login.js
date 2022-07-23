const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const date = require('../Date');

const User = require("../models/user");

router.get("/login", (req, res) => {
    res.render('login', {date: date});
});

router.post("/login", async (req, res) => {
    try {   
        const user = await User.find({email: req.body.email});
        if(user == null) {
            res.redirect("/signup");
        } else {
            res.redirect("/add%20projects");
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;