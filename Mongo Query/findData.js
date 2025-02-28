import connectDB from "./connectDB.js";

async function findData(query) {
    try {
        const client = await connectDB();  // Connect to MongoDB
        const db = client.db("userData");
        const collection = db.collection("userLogin");

        const documents = await collection.find(query || {}).toArray();  // Use the query if provided

        console.log("fetched login deatail successfully");
        return documents;
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

export default findData;
