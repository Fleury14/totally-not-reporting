import { Request, Response, NextFunction } from 'express';
import * as db from './../../../db/db';

export async function repeatQuery(req: Request, res: Response, next: NextFunction) {
    try {
        // **** NOTE: THIS IS ACTUALLY QUITE DANGEROUS ****
        // We're basically taking whatever is given from this endpoint and throwing the command at the database
        // It is super easy with this endpoint to break the table completely without some serious vetting of the request
        // There is some minor vetting involved here, but if this was to be a live app, it wouldnt nearly be enough

        if(!req.body.query) {
            // make sure fields arent missing
            res.status(400).json({message: "Missing Fields"});
        } else {
            const query:string = req.body.query;
            console.log('Query: ', query);
            let forbidFlag:boolean = false;
            const forbiddenWords:string[] = ['drop', 'alter', 'delete', 'table', ';'];
            forbiddenWords.forEach( word => {
                if (query.toLowerCase().indexOf(word) != -1) {
                    forbidFlag = true;
                }
            });
            if (forbidFlag) {
                console.log('Forbidden flag found in query');
                res.status(403).json({message: "Invalid query"});
            } else {
                db.any(query, req.body.search).then( (resp) => {
                    // return all relevant info for the storing of the query
                    res.json({
                        message: "Search results",
                        result: resp,
                        query: query,
                        category: req.body.category,
                        search: req.body.search
                    })
                }).catch(err => res.status(500).json({message: "Error", error: err}));
            }         
        }
    } catch (err) {
        res.json({message: "Error", error: err})
    }
    
    
}