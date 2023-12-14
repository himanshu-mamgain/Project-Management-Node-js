const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Project = require('../models/project');
const date = require('../Date');

router.get('/nodeJs', async (req, res) => {
    const nodeJsProjects = await Project.find({type: "nodeJs"});
    try {
        const totalProjects = await Project.find({type: "nodeJs"}).count({});
        res.render('project', {date: date, projects: nodeJsProjects, totalProjects: totalProjects});
    } catch(err) {
        console.log(err);
    }
});

router.get('/restApi', async (req, res) => {
    const restApiProjects = await Project.find({type: "restApi"});
    try {
        const totalProjects = await Project.find({type: "restApi"}).count({});
        res.render('project', {date: date, projects: restApiProjects, totalProjects: totalProjects});
    } catch(err) {
        console.log(err);
    }
});

router.get('/reactJs', async (req, res) => {
    const reactJsProjects = await Project.find({type: "reactJs"});
    try {
        const totalProjects = await Project.find({type: "reactJs"}).count({});
        res.render('project', {date: date, projects: reactJsProjects, totalProjects: totalProjects});
    } catch(err) {
        console.log(err);
    }
});

router.get('/javaScript', async (req, res) => {
    const javaScriptProjects = await Project.find({type: "javaScript"});
    try {
        const totalProjects = await Project.find({type: "javaScript"}).count({});
        res.render('project', {date: date, projects: javaScriptProjects, totalProjects: totalProjects});
    } catch(err) {
        console.log(err);
    }
});

router.get('/html&css', async (req, res) => {
    const htmlCssProjects = await Project.find({type: "html&css"});
    try {
        const totalProjects = await Project.find({type: "html&css"}).count({});
        res.render('project', {date: date, projects: htmlCssProjects, totalProjects: totalProjects});
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;