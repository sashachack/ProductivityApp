import clientPromise from "./mongodb";
// const ObjectId = mongodb.ObjectID
//API endpoint for grabbing tasks

export default async(req, res) => {
    
    const client = await clientPromise;
    const db = client.db("Task_Manager");
    let bodyObject = JSON.parse(req.body);
    console.log(bodyObject)
    console.log('Get labels')
 
    const tasks = await db.collection("labels").find({ email: bodyObject.email,  
                                                        }).toArray();
    res.json({ status: 200, data: tasks });

}