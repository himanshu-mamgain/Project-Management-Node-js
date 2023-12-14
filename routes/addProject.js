const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Project = require('../models/project');
const User = require('../models/user');

const date = require('../Date');

const { checkAuth } = require('../middleware/check');

router.get("/add%20projects", checkAuth, (req, res) => {
    res.render('addProject', {date: date});
});

router.post("/add%20projects", async (req, res) => {
    try {
        let imgLink;

        switch(req.body.type) {
            case "nodeJs":
                imgLink = "https://blog.rahulbhutani.com/wp-content/uploads/2020/10/nodejs-1.png";
                break;
            case "reactJs":
                imgLink = "https://res.cloudinary.com/practicaldev/image/fetch/s--54ca_F2q--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/1wwdyw5de8avrdkgtz5n.png";
                break;
            case "restApi":
                imgLink = "https://uploads-ssl.webflow.com/6021b6d3d69a2f4e053b8d55/6170df8ad624dbf64f269eb3_Rest%20API%20.png";
                break;
            case "javaScript":
                imgLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png";
                break;
            case "html&css":
                imgLink = "https://miro.medium.com/max/792/1*lJ32Bl-lHWmNMUSiSq17gQ.png";
                break;    
            default:
                imgLink = "https://jkfenner.com/wp-content/uploads/2019/11/default.jpg"
        }

        const user = await User.findById(req.cookies.userId);
        
        const project = new Project({
            title: req.body.title,
            githubLink: req.body.githubLink,
            deployedLink: req.body.deployedLink,
            imgLink: imgLink,
            username: user.username,
            type: req.body.type
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