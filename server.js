import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

import insertManyRoute from "./Routes/registerRoute.js";
import loginRoute from "./Routes/loginRoute.js";
import deleteManyRoute from "./Routes/deleteManyRoute.js";
import connectDB from "./Mongo Query/connectDB.js";
import openJobsRoute from "./Routes/openJobsRoute.js";
import insertJobRoute from "./Routes/insertJobRout.js";
import ProtectedRoute from './Routes/ProtectedRoute.js';
import updateUserRoute from './Routes/updateUserRoute.js'

import { fileURLToPath } from 'url';

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/register", insertManyRoute);
app.use("/login", loginRoute);
app.use("/delete", deleteManyRoute);
app.use("/fetchJobs", openJobsRoute);
app.use("/insertJob", insertJobRoute);
app.use("/protected", ProtectedRoute);
app.use("/update-jobbber/details", updateUserRoute);


connectDB();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
