import connectDB from "./connectDB.js"; 
async function findData(query) {
    try {
        const client = await connectDB();  
        const db = client.db("openJobs");
        const collection = db.collection("jobs");

        const documents = await collection.find(query || {}).toArray();  
        
        return documents;
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

export default findData;
