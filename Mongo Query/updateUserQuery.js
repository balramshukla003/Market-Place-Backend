import connectDB from "./connectDB.js";

async function updateData(query, data) {

    try {
        const client = await connectDB();
        const db = client.db("userData");
        const collection = db.collection("userLogin");

        console.log("Query: ", query, " Data: ", data);

        // Perform the update with upsert option
        const result = await collection.updateOne(query, { $set: data });

        if (result.upsertedId) {
            // If a new document was created
            console.log({
                result,
                message: `A new document was created with ID: ${result.upsertedId._id}`,
            })
            return {
                result,
                message: `A new document was created with ID: ${result.upsertedId._id}`,
            };
        } else if (result.matchedCount > 0 && result.modifiedCount > 0) {
            // If an existing document was updated
            console.log({
                result,
                message: "Document updated successfully",
            })
            return {
                result,
                message: "Document updated successfully",
            };
        } else if (result.matchedCount > 0 && result.modifiedCount === 0) {
            // If the query matched but no changes were needed
            console.log({
                result,
                message: "No changes were made as the data was already up-to-date.",
            })
            return {
                result,
                message: "No changes were made as the data was already up-to-date.",
            };
        }
        client.close();
        console.log(result, "No documents matched the query.")
        return { result, message: "No documents matched the query." };
    } catch (err) {
        console.error("Error updating data:", err);
        throw err;
    }
}

export default updateData;
