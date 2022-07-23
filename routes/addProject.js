const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/project');

const date = require('../Date');

router.get("/add%20projects", (req, res) => {
    res.render('addProject', {date: date});
});

router.post("/add%20projects", async (req, res) => {
    try {
        const project = new Project({
            title: req.body.title,
            githubLink: req.body.githubLink,
            deployedLink: req.body.deployLink
        });

        project.save((err, project) => {
            if(!err) {
                console.log("Project added successfully!");
            } else {
                console.log(err);
                res.redirect("/add%20projects");
            }
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;