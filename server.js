import express from "express";
import dotenv from "dotenv";
import insertManyRoute from "./Routes/insertRoute.js";
import findRoute from "./Routes/findRoute.js";
import deleteManyRoute from "./Routes/deleteManyRoute.js";
import connectDB from "./Mongo Query/connectDB.js";
import openJobsRoute from "./Routes/openJobsRoute.js";
import cors from 'cors';
import bodyParser from "body-parser";


const app = express();
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173'
}));
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());


app.use("/insert", insertManyRoute);
app.use("/find", findRoute);
app.use("/delete", deleteManyRoute);
app.use("/fetchJobs", openJobsRoute);


connectDB();
app.get("/", (req, res) => {
    res.send("Hello, this is a simple REST API for inserting documents into a MongoDB database.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
