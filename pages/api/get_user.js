import clientPromise from "./mongodb";

//API endpoint for grabbing user info

export default async(req, res) => {
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    console.log(bodyObject)

    const tasks = await db.collection("users").find({ user_id: bodyObject.user_id }).toArray();
    res.json({ status: 200, data: tasks });


}