const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const date = require('../Date');

const Project = require('../models/project');

router.get('/:id', async (req, res) => {
    var foundProject = await Project.findOne({"id" : req.params.id});
    try {
        res.render('update', {project: foundProject, date: date});
    } catch(err) {
        console.log(err);
    }
});

router.post('/update%20project/:id', async (req, res) => {
    await Project.findByIdAndUpdate(req.params.id, 
        { $set: {
            title: req.body.title, 
            type: req.body.type, 
            githubLink: req.body.githubLink,
            deployedLink: req.body.deployedLink
        }});
    try {
        res.redirect('/projects');
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;