import { buildCommentsPath, extractData, writeToFile } from "../../../helpers/api-util";
import { MongoClient } from "mongodb";

async function handler(req, res) {
    const eventId = req.query.eventId;
    const url = 'mongodb://memelo:Memelo2020@ac-3ryswgt-shard-00-00.1bpni6a.mongodb.net:27017,ac-3ryswgt-shard-00-01.1bpni6a.mongodb.net:27017,ac-3ryswgt-shard-00-02.1bpni6a.mongodb.net:27017/events?ssl=true&replicaSet=atlas-aa944x-shard-0&authSource=admin&retryWrites=true&w=majority&appName=FirstMongoDBProject';

    if(req.method === "POST") {
        const email = req.body.email;
        const name = req.body.name;
        const text = req.body.text;

        if (
            !email ||
            email.trim() === '' ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !comment ||
            comment.trim() === ''
          ) {
            res.status(422).json({message: 'Invalid Input.'});
            return;
          }

        const newComment = {
            email: email,
            name: name,
            text: text,
            eventId: eventId,
        }

        const client = await MongoClient.connect(url);
        const db = client.db();
        const result = await db.collection('comments').insertOne(newComment);
        console.log(result);
        
        res.status(201).json({message: 'Success', comments: newComment})
    }
    if(req.method === 'GET'){
        const filePath = buildCommentsPath();
        const data = extractData(filePath);
        res.status(200).json({comments: data});
    }
}

export default handler;