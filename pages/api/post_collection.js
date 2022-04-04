import clientPromise from "./mongodb";

//API endpoint for adding tasks

export default async(req, res) => {
    console.log('Post a new collection')
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    // console.log()
    console.log(bodyObject)
    let col = await db.collection("collections").insertOne(bodyObject);
    res.json(col.ops[0]);
}