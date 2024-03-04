import { MongoClient } from "mongodb";

async function handler(req, res) {
    const url = 'mongodb://memelo:Memelo2020@ac-3ryswgt-shard-00-00.1bpni6a.mongodb.net:27017,ac-3ryswgt-shard-00-01.1bpni6a.mongodb.net:27017,ac-3ryswgt-shard-00-02.1bpni6a.mongodb.net:27017/newsletter?ssl=true&replicaSet=atlas-aa944x-shard-0&authSource=admin&retryWrites=true&w=majority&appName=FirstMongoDBProject'
    console.log(req)
    if(req.method === 'POST') {
        const email = req.body.email;

        if(!email || !email.includes('@')) {
            res.status(422).json({message: 'Invalid email address.'});
            return;
        }

        const client = await MongoClient.connect(url);
        const db = client.db();
        await db.collection('emails').insertOne({email: email,});
        client.close();

        res.status(201).json({message: "Signed Up!"});
    } else {
        res.status(200).json({message: 'Success'});
    }
}

export default handler;