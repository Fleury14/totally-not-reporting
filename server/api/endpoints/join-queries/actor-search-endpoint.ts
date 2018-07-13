import { Request, Response, NextFunction } from 'express';
import * as db from './../../../db/db';

export async function actorSearch(req: Request, res: Response, next: NextFunction) {
    try {
        if(!req.body.search) {
            // make sure fields arent missing
            res.status(400).json({message: "Missing Fields"});
        } else {
            // build our query, log it, and execute
            const query = 'SELECT * FROM movies_meta FULL OUTER JOIN movies_credits ON (movie_id = credit_id) WHERE LOWER (movie_cast) LIKE LOWER( \'%$1#%\' )';
            // console.log('Query: ', query);
            db.any(query, req.body.search).then( (resp) => {
                // return all relevant info for the storing of the query
                res.json({
                    message: "Search results",
                    result: resp,
                    query: query,
                    endpoint: 'actor-search',
                    category: 'cast',
                    search: req.body.search
                })
            }).catch(err => res.status(500).json({message: "Error", error: err}));
        }
    } catch (err) {
        res.json({message: "Error", error: err})
    }
    
    
}
