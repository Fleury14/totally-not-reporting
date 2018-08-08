import { Request, Response, NextFunction } from 'express';
import * as db from './../../../db/db';
// import * as cryptoJS from 'crypto-js';
const cryptoJS = require('crypto-js');

export async function getClientsAndAccounts(req: Request, res: Response, next: NextFunction) {
    try {
        const query = `SELECT * FROM "Client" LEFT OUTER JOIN "Account" ON "Client".id = client_id`;
        await db.any(query).then( async resp => {
            await resp.forEach( (client, index) => {
                if (client && client['client_name']) {
                    const decryptedTitle = privateDecrypt(client['client_name']).then(title => {
                        client['client_name'] = title;
                    });
                    
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

async function privateDecrypt(hash:string) {
    try {
        if(hash != null && !hash.includes(' ')) {
            const decrypted = cryptoJS.AES.decrypt(hash.toString(), '26252C233A402A3F');
            if(decrypted.toString(cryptoJS.enc.Utf8) == '') {
                return hash;
            }
            return decrypted.toString(cryptoJS.enc.Utf8);
        }
    } catch (e) {
        throw new Error(e);
    }
}