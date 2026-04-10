const jwt = require("jsonwebtoken");

const JWT_AUTH = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) return res.status(403).json({message: `JWT not provided!`});
        
        console.log(token.split(" ")[1]);
        const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);
        console.log(decoded);

        req.decodedData = decoded;
        next();

    }catch (error) {
        res.status(403).json({message: error.message});

    }
}

module.exports = JWT_AUTH;