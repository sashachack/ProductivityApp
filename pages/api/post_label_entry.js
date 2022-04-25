import clientPromise from "./mongodb";

//API endpoint for adding tasks

export default async(req, res) => {
    console.log('Post a new collection')
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    // console.log()
    console.log(bodyObject)
    let col = await db.collection("labels").insertOne(bodyObject);
    console.log(col)
    res.json(col.ops[0]);
}