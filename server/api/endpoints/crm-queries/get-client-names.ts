import { Request, Response, NextFunction } from 'express';
import * as db from './../../../db/db';
// import * as cryptoJS from 'crypto-js';
const cryptoJS = require('crypto-js');

export async function getClientNames(req: Request, res: Response, next: NextFunction) {
    try {
        const query = `SELECT sp_decrypt(client_name) FROM "Client"`;
        await db.any(query).then( resp => {
            resp.forEach( (client, index) => {
                if (client && client['client_name'] && index < 3) {
                    const decryptedTitle = privateDecrypt(client['client_name']);
                    client['client_name'] = decryptedTitle;
                }
            });
            
            res.json({
                message: "Query successful",
                result: resp,
                query: query,
                endpoint: 'crm/get-all-clients'
            });
        });
    } catch (err) {
        res.status(500).json({message: 'Server error during request', error: err})
    }
    
}

// TODO: DOES NOT COME BACK WITH PROPER RESULT
async function privateDecrypt(hash:string) {
    try {
        console.log('calling decrypt with hash', hash);
        if(hash != null && !hash.includes(' ')) {
            const decrypted = cryptoJS.AES.decrypt(hash.toString(), process.env.BY_KEY);
            console.log('decrypted', decrypted);
            if(decrypted.toString(cryptoJS.enc.Utf8) == '') {
                return hash;
            }
            console.log(decrypted.toString(cryptoJS.enc.Utf8));
            return decrypted.toString(cryptoJS.enc.Utf8);
        }
    } catch (e) {
        throw new Error(e);
    }
}