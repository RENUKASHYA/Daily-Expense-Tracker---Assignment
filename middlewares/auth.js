const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = request.header('Authorization')
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' })

    try {
        const verified = token.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}

module.exports = authenticate;