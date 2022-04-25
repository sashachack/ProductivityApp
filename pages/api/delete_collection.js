import clientPromise from "./mongodb";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

// API endpoint for deleting collections

const deleteTask = async(req, res) => {
    console.log('Delete a collection');
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    console.log(bodyObject.id);
    await db.collection("collections").deleteOne({ '_id': ObjectId(bodyObject.id) });
    res.json(bodyObject);
}

export default deleteTask;