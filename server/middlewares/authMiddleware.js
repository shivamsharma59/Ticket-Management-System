const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    // if not token
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    // if token is not valid    
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    // if token is valid
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log(user);
    next();
}

module.exports = auth;