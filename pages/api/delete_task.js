import clientPromise from "./mongodb";
import mongodb from "mongodb"
// gonna need so can convert string into MongoDB object
const ObjectId = mongodb.ObjectID

//API endpoint for deleting tasks

const deleteTask = async(req, res) => {
    console.log('Delete a task')
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    console.log(bodyObject.id)
    await db.collection("Tasks").deleteOne({ '_id': ObjectId(bodyObject.id) });
    // res.json(newTask.ops[0]);
}

export default deleteTask;