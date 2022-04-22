// This is an endpoint to edit a task.
// What can we edit?
// TITLE, STATUS, LABEL, DATE: {YEAR, MONTH, DAY}

import clientPromise from "./mongodb";
import mongodb from "mongodb"



export default async(req, res) => {
    console.log('Edit labels')
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    console.log(bodyObject)
    await db.collection("labels").update({ 'email': bodyObject.email }, { $set: bodyObject.update });
    // // console.log(bodyObject.data)
    // let newTask = await db.collection("Tasks").insertOne(bodyObject.data);
    res.json(bodyObject);
}