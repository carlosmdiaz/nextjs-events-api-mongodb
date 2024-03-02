import fs from 'fs';
import path from 'path';

function handler(req, res) {
    if(req.method === 'POST') {
        const email = req.body.email;
    } else {

    }
}

export default handler;