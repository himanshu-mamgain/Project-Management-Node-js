const express = require('express');
const router = express.Router();

const date = require("../Date");

router.get("/", (req, res) => {
    res.render("home", {date: date});
});

module.exports = router;