import { buildCommentsPath, extractData, writeToFile } from "../../../helpers/api-util";

function handler(req, res) {
    if(req.method === "POST") {
        const email = req.body.email;
        const name = req.body.name;
        const text = req.body.text;
        const newComment = {
            id: new Date().toISOString(),
            email: email,
            name: name,
            text: text,
        }

        //Store the Comments in the comments.json
        const fileData = buildCommentsPath();
        const data = extractData(fileData);
        data.push(newComment);
        writeToFile(fileData, data);
        res.status(201).json({message: 'Success', comments: newComment})
    } else {
        const filePath = buildCommentsPath();
        const data = extractData(filePath);
        res.status(200).json({comments: data});
    }
}

export default handler;