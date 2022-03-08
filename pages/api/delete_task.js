import clientPromise from "./mongodb";
import ObjectId from './mongodb'

//API endpoint for deleting tasks

export default async(req, res) => {
    console.log('Delete a task')
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    console.log(bodyObject.id)
    await db.collection("Tasks").deleteOne({ '_id': bodyObject.id });
    // res.json(newTask.ops[0]);
}