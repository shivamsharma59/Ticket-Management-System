const auth = (req, res) => {
    // if not token
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
    return res.status(200).json({ msg: "Authorized" });
}