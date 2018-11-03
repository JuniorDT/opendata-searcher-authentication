const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
        const token = req.headers['x-access-token'];
        if (!token) {

            return res
                .status(401)
                .send({auth: false, message: "No token provider"});
        }

        jwt.verify(token, process.env.SECRET_KEY, (errors, decoded) => {
            if (errors) {

                return res
                    .status(500)
                    .send({auth: false, message: "Failed to authenticate token"});
            }
            req.data = {
                userId: decoded.id,
            };
        });
        return next();
    }
};
