import { buildNewsletterPath, extractData, writeToFile } from "../../../helpers/api-util";

function handler(req, res) {
    console.log(req)
    if(req.method === 'POST') {
        const email = req.body.email;

        if(!email || !email.includes('@')) {
            res.status(422).json({message: 'Invalid email address.'});
            return;
        }
        const newsletterRegistration = {
            id: new Date().toISOString(),
            email: email,
        }
        const filePath = buildNewsletterPath();
        const data = extractData(filePath);
        data.push(newsletterRegistration);
        writeToFile(filePath, data);
        res.status(201).json({message: "Success!", register: newsletterRegistration});
    } else {
        res.status(200).json({message: 'Success'});
    }
}

export default handler;