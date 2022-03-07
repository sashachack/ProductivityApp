import clientPromise from "./mongodb";

//API endpoint for adding user

export default async(req, res) => {
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    console.log('here')
    console.log(bodyObject)
    let newTask = await db.collection("users").insertOne(bodyObject);
    res.json(newTask.ops[0]);
}