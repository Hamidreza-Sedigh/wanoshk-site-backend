// config/verifyToken.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function verifyToken(req, res, next){
    // old code: jean:
    // const bearrerToken = req.header('user');
    // if(typeof bearrerToken !== 'undefined'){
    //     req.token = bearrerToken;
    //     next();
    // } else {
    //     res.sendStatus(403);
    // }

    //new Code:
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // ذخیره اطلاعات کاربر
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports =  verifyToken