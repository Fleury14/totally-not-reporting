import { Request, Response, NextFunction } from 'express';
import * as db from './../../../db/db';

export async function tableJoin(req: Request, res: Response, next: NextFunction) {
    try {
        if(!req.body.search) {
            res.status(400).json({message: "Missing Fields"});
        } else if (req.body.search.length === 1) {
            const query = 'SELECT * FROM req.body.search.table1';
            } else if (req.body.search.length === 4) {
                const query = 'SELECT * FROM movies_meta FULL OUTER JOIN req.body.search.table2 ON req.body.search.table1.id = req.body.search.table2.id'; 
                // TODO: won't have IDs here
            console.log('Query: ', query);
            db.any(query, req.body.search).then( (resp) => {
                // return all relevant info for the storing of the query
                res.json({
                    message: "Search results",
                    result: resp,
                    query: query,
                    endpoint: 'table-join',
                    category: `${req.body.table1} Joins`,
                    search: req.body.search
                })
            }).catch(err => res.status(500).json({message: "Error", error: err}));
        }
    } catch (err) {
        res.json({message: "Error", error: err})
    }
    
}