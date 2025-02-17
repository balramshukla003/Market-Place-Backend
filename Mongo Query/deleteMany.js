import connectDB from "./connectDB.js";

async function deleteOne(query) {
    try {
        const client = await connectDB();
        const db = client.db("userData");
        const collection = db.collection("userLogin");

        const result = await collection.deleteMany(query);
        return result;

    } catch (error) {
        console.error("Error deleting document:", error);
    }
}

export default deleteOne;
