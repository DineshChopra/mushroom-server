const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // set headers -- authorization = 'Bearer <token string>'
        const token = req.headers.authorization.split(' ')[1];
        const jwtKey = 'SecretKey';
        const decoded = jwt.verify(token, jwtKey);
        req.userData = decoded;
        console.log('checkAuth --- try block');
        next();
    } catch(error) {
        console.log('checkAuth --- catch block block');
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }

    // next();
}