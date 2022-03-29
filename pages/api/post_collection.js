import clientPromise from "./mongodb";

//API endpoint for adding tasks

export default async(req, res) => {
    console.log('Post a task')
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    // console.log(bodyObject.data)
    let newTask = await db.collection("collections").insertOne(bodyObject.data);
    res.json(newTask.ops[0]);
}