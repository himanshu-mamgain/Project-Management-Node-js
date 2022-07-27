const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Project = require('../models/project');
const date = require('../Date');

router.get('/nodeJs', async (req, res) => {
    const nodeJsProjects = await Project.find({type: "nodeJs"});
    try {
        res.render('project', {date: date, projects: nodeJsProjects});
    } catch(err) {
        console.log(err);
    }
});

router.get('/restApi', async (req, res) => {
    const restApiProjects = await Project.find({type: "restApi"});
    try {
        res.render('project', {date: date, projects: restApiProjects});
    } catch(err) {
        console.log(err);
    }
});

router.get('/reactJs', async (req, res) => {
    const reactJsProjects = await Project.find({type: "reactJs"});
    try {
        res.render('project', {date: date, projects: reactJsProjects});
    } catch(err) {
        console.log(err);
    }
});

router.get('/javaScript', async (req, res) => {
    const javaScriptProjects = await Project.find({type: "javaScript"});
    try {
        res.render('project', {date: date, projects: javaScriptProjects});
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;