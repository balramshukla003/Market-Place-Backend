import express from "express";
import jwt from "jsonwebtoken";
import findData from "../Mongo Query/findData.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-strong-secret-key"; // Replace with a secure secret key

router.post('/', async (req, res) => {
    try {
        const { email, password, type } = req.body;
        console.log({ email, password, type });

        const user = await findData({ email, type });

        if (!user[0]) {
            return res.json({ status: 'error', error: 'user not found' });
        }
        if (user[0].type !== type) {
            console.log("User:" + user[0].type);
            return res.json({ status: 'error', error: 'Type miss match' });
        }
        if (user[0].password !== password) {
            return res.json({ status: 'error', error: 'Password not matched' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user[0]._id, name: user[0].name, email: user[0].email, type: user[0].type },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            status: 'success',
            match: true,
            name: user[0].name,
            type: user[0].type,
            email: user[0].email,
            token,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Server error. Please try again later.',
        });
    }
});

export default router;
