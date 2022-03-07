import clientPromise from "./mongodb";

//API endpoint for adding tasks

export default async(req, res) => {
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    let newTask = await db.collection("Tasks").insertOne(bodyObject);
    res.json(newTask.ops[0]);
}