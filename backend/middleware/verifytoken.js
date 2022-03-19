const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
    let token = req.header("Authorization");
    if (token) {
        token = req.header("Authorization").replace("Bearer ", "");
    }
    if (!token) return res.status(401).json({ message: "Access Denied" });
    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SERECTKEY);
        //   console.log("this is verify check"+verified.login_id);
        const user = await User.findById(verified.login_id);
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: "Access Denied" });
        }
        req.token = token;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
