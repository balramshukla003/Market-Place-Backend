import express from "express";
import findData from "../Mongo Query/findData.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password, type } = req.body;
        console.log({ email, password, type });

        const user = await findData({ email });

        if (!user[0]) {
            return res.json({ status: 'error', error: 'user not found' });
        }
        if (user[0].type !== type) {
            console.log("USeru:" + user[0].type)
            return res.json({ status: 'error', error: 'Type miss match' });
        }
        if (user[0].password !== password) {
            return res.json({ status: 'error', error: 'Password not matched' });
        }
        res.json({ status: 'success', match: true, name: user[0].name });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Server error. Please try again later.',
        });
    }
});

export default router;
