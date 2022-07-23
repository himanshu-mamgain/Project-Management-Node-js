const express = require('express');
const router = express.Router();

const date = require('../Date');

const User = require("../models/user");

router.get("/signup", (req, res) => {
    res.render('signup', {date: date});
});

router.post("/signup", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        await user.save((err, user) => {
            if(!err) {
                console.log("User signup successfully");
                res.redirect("/add%20projects");
            } else {
                console.log(err);
                res.redirect("/signup");
            }
        });

    } catch(err) {
        console.log(err);
    }
});

module.exports = router;