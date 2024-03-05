
import { insertDocument, connectDatabase, getDocument } from "../../../helpers/db-util";

async function handler(req, res) {
    const eventId = req.query.eventId;
    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' })
        return;
    }

    if(req.method === "POST") {
        const email = req.body.email;
        const name = req.body.name;
        const comment = req.body.text;

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
            text: comment,
            eventId: eventId,
        }
        let result;
        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({message: 'Success', comments: newComment});
        } catch (error) {
            res.status(500).json({ message: 'Inserting data failed!'});
            client.close();
            return;
        }
    }
    if(req.method === 'GET'){
        let result;
        try {
            result = await getDocument(client, 'comments', eventId);
            console.log(result);
            res.status(200).json({comments: result});
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed!' });
        }
    }

    client.close();
}

export default handler;