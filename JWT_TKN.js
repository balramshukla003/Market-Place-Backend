import jwt from "jsonwebtoken";

async function authenticateToken(token) {

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
        return ({ status: 200, data: decoded });

    } catch (err) {
        return ({ status: 'error', message: err });
    }
};


export default authenticateToken;