const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const bcrypt = require("bcrypt");

const date = require('../Date');

const User = require("../models/user");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });
};

router.get("/signup", (req, res) => {
    res.render('signup', {err: "", date: date});
});

router.post("/signup", async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const checkEmail = await User.findOne({email: req.body.email});
        const checkUsername = await User.findOne({username: req.body.username});

        if(checkEmail == null) {
            if(checkUsername == null) {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: hashPassword
                });
        
                await user.save((err, user) => {
                    if(!err) {
                        console.log("User signup successfully");
                        const token = createToken(user._id);
                        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
                        res.cookie('userId', user._id);
                        res.redirect("/add%20projects");
                    } else {
                        console.log(err);
                        res.redirect("/signup");
                    }
                });
            } else {
                res.render('signup', {err: "Username exist!", date: date});
            }
        } else {
            res.render('signup', {err: "Email already registered!", date: date});
        }

    } catch(err) {
        console.log(err);
    }
});

module.exports = router;