import { Request, Response, NextFunction } from 'express';
import * as db from './../../../db/db';

export async function getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.body.search) {
            console.log('Missing paramter');
            res.status(500).json({message: 'Missing parameteres'})
        } else {
            const query = `SELECT * FROM "Employee" WHERE id = $1`;
            await db.any(query, req.body.search).then( async resp => {
                
                res.json({
                    message: "Query successful",
                    result: resp,
                    query: query,
                    endpoint: 'crm/get-employee-by-id'
                });
            });
        }
        
    } catch (err) {
        res.status(500).json({message: 'Server error during request', error: err})
    }
    
}
