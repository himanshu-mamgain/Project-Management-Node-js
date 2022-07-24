const express = require('express');
const router = express.Router();

const Project = require("../models/project");

router.post("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(project == null) {
            console.log("There is no project with matching id");
            res.redirect("/projects");
        } else {
            await project.remove();
            console.log("Project deleted successfully!");
            res.redirect("/projects");
        }
    } catch (err) {
        console.log(err);
        res.redirect("/projects");
    }
});

module.exports = router;