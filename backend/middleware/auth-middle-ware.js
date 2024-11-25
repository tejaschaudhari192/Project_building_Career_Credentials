const jwt = require('jsonwebtoken')

const SECRET = 'ITS SECRET';


const verifyToken = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'No token ' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ message: 'unAuth' });

        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken