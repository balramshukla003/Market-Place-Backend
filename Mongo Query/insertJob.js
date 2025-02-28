import connectDB from "./connectDB.js";

async function insertOne(data) {
    try {

        const client = await connectDB();
        const db = client.db("openJobs");
        const collection = db.collection("jobs");

        const result = await collection.insertOne(data);
        console.log(result);
        return { success: true, message: result.insertedCount };

    } catch (error) {
        return { success: false, error: error.message };
    }
}


export default insertOne;
