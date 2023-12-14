const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const date = require('../Date');

const Project = require('../models/project');

router.get('/:id', async (req, res) => {
    var foundProject = await Project.findById(req.params.id);
    try {
        res.render('update', {project: foundProject, date: date});
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;