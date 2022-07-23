const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    githubLink: String,
    deployedLink: String,
    imgLink: String,
    username: String
});

module.exports = mongoose.model("Project", projectSchema);