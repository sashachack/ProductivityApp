import clientPromise from "./mongodb";
// const ObjectId = mongodb.ObjectID
//API endpoint for grabbing tasks

export default async(req, res) => {
    console.log('Get tasks')
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    console.log(bodyObject)
    console.log(bodyObject.collectionID)
    const tasks = await db.collection("Tasks").find({ email: bodyObject.email,  
                                                        collection_id: bodyObject.collectionID}).toArray();
    res.json({ status: 200, data: tasks });

}