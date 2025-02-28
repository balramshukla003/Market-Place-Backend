import express from "express";
import insertOne from "../Mongo Query/insertOne.js";

const router = express.Router();

router.post('/', async (req, res) => {

    const jsonData = req.body;
    const result = await insertOne(jsonData);

    if (result.success) {
        res.status(200).json({ status: true, message: result.message });
    } else {
        res.status(500).json({ status: false, error: result.message });
    }
});



export default router;
