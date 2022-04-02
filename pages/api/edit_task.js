// This is an endpoint to edit a task.
// What can we edit?
// TITLE, STATUS, LABEL, DATE: {YEAR, MONTH, DAY}

import clientPromise from "./mongodb";
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID


export default async(req, res) => {
    console.log('Edit a task')
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    console.log(bodyObject);
    await db.collection("Tasks").update({ '_id': ObjectId(bodyObject.id) }, { $set: bodyObject.update });
    res.json(newTask.ops[0]);

    // // console.log(bodyObject.data)
    // let newTask = await db.collection("Tasks").insertOne(bodyObject.data);
}