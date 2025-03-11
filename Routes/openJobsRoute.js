import express from "express";
import fetchJobs from "../Mongo Query/fetchJobs.js";

const app = express();
const router = express.Router();

router.post("/", async (req, res) => {


    const Query = req.body.query;
    console.log("backend: ", Query)

    try {
        const jobs = await fetchJobs(Query);
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ error: "No jobs found" });
        }
        console.log("Fetched jobs successfully");
        res.json({ jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "An error occurred while fetching jobs" });
    }


});

export default router;