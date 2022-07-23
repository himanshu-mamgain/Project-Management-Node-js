const express = require('express');
const router = express.Router();

const date = require("../Date");

const Project = require("../models/project");

router.get("/", async(req, res) => {
    try {
        const projects = await Project.find().limit(4);
        await res.render("home", {projects: projects, date: date});
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;