const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const date = require("../Date");

const Project = require('../models/project');

router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.render('project', {projects: projects, date: date});
    } catch(err) {
        console.log(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const foundProject = await Project.findById(req.params.id);
        if(foundProject == null) {
            res.redirect("/projects");
        } else {
            await foundProject.remove();
            res.redirect("/projects");
        }
    } catch(err) {
        console.log(err);
        res.redirect("/projects");
    }
});

module.exports = router;