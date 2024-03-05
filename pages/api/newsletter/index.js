
import { insertDocument, connectDatabase } from "../../../helpers/db-util";

async function handler(req, res) {
    if(req.method === 'POST') {
        const email = req.body.email;

        if(!email || !email.includes('@')) {
            res.status(422).json({message: 'Invalid email address.'});
            return;
        }

        let client;
        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({ message: 'Connecting to the database failed!' });
            return;
        }

        try {
            await insertDocument(client, 'newsletter', { email: email});
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'Inserting data failed!' });
            client.close();
            return;
        }
        
        res.status(201).json({message: "Signed Up!"});
    } else {
        res.status(200).json({message: 'Success'});
    }
}

export default handler;