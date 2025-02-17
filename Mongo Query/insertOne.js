import connectDB from "./connectDB.js";
import findData from "./findData.js";

async function insertOne(data) {
    try {

        const client = await connectDB();
        const db = client.db("userData");
        const collection = db.collection("userLogin");

        const email = data.email;
        const type = data.type;

        const exists = await collection.findOne({ email, type });

        console.log(`email: ${email}, type: ${type}, exists: ${JSON.stringify(exists)}`);

        if (exists && exists.type === type) {
            console.log("Match found: Not inserting data.");
            return { success: false, message: "Email already exists for the given type" };
        } else {
            const result = await collection.insertOne(data);
            console.log(result);
            return { success: true, message: result.insertedCount };
        }


    } catch (error) {
        return { success: false, error: error.message };
    }
}


export default insertOne;
