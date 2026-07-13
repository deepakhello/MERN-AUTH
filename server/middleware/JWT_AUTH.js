const jwt = require("jsonwebtoken");

const JWT_AUTH = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader) return res.status(401).json({ message: 'Authorization token not provided.' });

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

        if (!token) return res.status(401).json({ message: 'JWT token is malformed.' });

        if (!process.env.SECRET) {
            console.error('JWT_SECRET is not defined in environment variables.');
            return res.status(500).json({ message: 'Server configuration error.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        req.decodedData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

module.exports = JWT_AUTH;