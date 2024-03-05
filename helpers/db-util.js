import { MongoClient } from "mongodb";

const url = 'mongodb://memelo:Memelo2020@ac-3ryswgt-shard-00-00.1bpni6a.mongodb.net:27017,ac-3ryswgt-shard-00-01.1bpni6a.mongodb.net:27017,ac-3ryswgt-shard-00-02.1bpni6a.mongodb.net:27017/events?ssl=true&replicaSet=atlas-aa944x-shard-0&authSource=admin&retryWrites=true&w=majority&appName=FirstMongoDBProject';

export async function connectDatabase() {
    const client = await MongoClient.connect(url);
    return client;
}

export async function insertDocument(client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getDocument(client, collection, eventId) {
    const db = client.db();
    const result = await db.collection(collection).find({eventId: eventId}).toArray();
    return result;
}