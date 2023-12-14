const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const date = require("../Date");

const Project = require('../models/project');

router.get("/projects", async (req, res) => {
    try {
        const totalProjects = await Project.count({});
        const projects = await Project.find();
        res.render('project', 
        {   projects: projects, 
            date: date, 
            totalProjects: totalProjects
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;