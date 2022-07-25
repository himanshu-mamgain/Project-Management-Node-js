const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(!err) {
                console.log(decodedToken);
                next();
            } else {
                console.log(err);
                res.redirect('/login');
            }
        });
    } else {
        res.redirect('/login');
    }
};

module.exports = checkAuth;