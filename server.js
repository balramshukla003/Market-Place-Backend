import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import insertManyRoute from "./Routes/registerRoute.js";
import loginRoute from "./Routes/loginRoute.js";
import deleteManyRoute from "./Routes/deleteManyRoute.js";
import connectDB from "./Mongo Query/connectDB.js";
import openJobsRoute from "./Routes/openJobsRoute.js";
import insertJobRoute from "./Routes/insertJobRout.js";
import ProtectedRoute from './Routes/ProtectedRoute.js';


const app = express();
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173'
}));
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());


app.use("/register", insertManyRoute);
app.use("/login", loginRoute);
app.use("/delete", deleteManyRoute);
app.use("/fetchJobs", openJobsRoute);
app.use("/insertJob", insertJobRoute);
app.use("/protected", ProtectedRoute);


connectDB();
app.get("/", (req, res) => {
    res.send("Hello, this is a simple REST API for communicating with MongoDB database. Author-Balram Shukla");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
