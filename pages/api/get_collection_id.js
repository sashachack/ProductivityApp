import clientPromise from "./mongodb";

//API endpoint for grabbing tasks

export default async(req, res) => {
    console.log('Get collections')
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    // console.log(bodyObject)

    const tasks = await db.collection("collections").find({ email: bodyObject.email, 
                                                            collection: bodyObject.collection_name }).toArray();
    res.json({ status: 200, data: tasks });

}