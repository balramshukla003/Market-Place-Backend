import express from "express";
import updateData from "../Mongo Query/updateUserQuery.js";

const router = express.Router();

router.put('/', async (req, res) => {
    try {
        const { email, type, name } = req.body;

        // Validate inputs
        if (!email || !type || !name) {
            return res.status(400).json({ status: false, message: "All fields are required." });
        }

        const query = { email, type };
        const data = { name };

        const result = await updateData(query, data);

        if (result.result.matchedCount === 1) {
            res.status(200).json({ status: true, message: result.message });
        } else {
            res.status(404).json({ status: false, message: "No matching document found." });
        }
    } catch (error) {
        console.error("Error in update route:", error);
        res.status(500).json({ status: false, message: "Internal server error." });
    }
});

export default router;
