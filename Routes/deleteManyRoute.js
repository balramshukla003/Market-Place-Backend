import express from "express";
import deleteMany from "../Mongo Query/deleteMany.js";

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const query = { };  

        const result = await deleteMany(query);
        res.status(200).json({ message: `Successfully deleted ${result.deletedCount} documents.`, data: result.deletedCount > 0 ? result.deletedCount : "No documents found to delete." });

    } catch (err) {
        res.status(500).json({ message: "Failed to delete data", error: err.message });
    }
})

export default router;