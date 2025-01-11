const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    // const authHeader = req.headers["Authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}


module.exports = {
    authenticateToken,
}