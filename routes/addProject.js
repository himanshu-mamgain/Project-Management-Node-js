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
        let imgLink;

        switch(req.body.type) {
            case "nodeJs":
                imgLink = "https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png";
                break;
            case "reactJs":
                imgLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png";
                break;
            case "restApi":
                imgLink = "http://plugins.miniorange.com/wp-content/uploads/2021/06/REST-API-icon.jpg";
                break;
            case "php":
                imgLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png"
                break;
            default:
                imgLink = "https://www.kindpng.com/picc/m/388-3883219_icon-security-testing-web-web-application-testing-icon.png"
        }
        
        const project = new Project({
            title: req.body.title,
            githubLink: req.body.githubLink,
            deployedLink: req.body.deployedLink,
            imgLink: imgLink
        });

        await project.save((err, project) => {
            if(!err) {
                console.log("Project added successfully!");
                res.redirect("/projects");
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