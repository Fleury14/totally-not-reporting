import { Request, Response, NextFunction } from 'express';
import * as db from './../../../db/db';

export async function categorySearch(req: Request, res: Response, next: NextFunction) {
    try {
        // whitelist column values to prevent injection since we're concating
        const acceptableColumns = ['budget', 'movie_id', 'original_title', 'overview', 'popularity', 'release_date', 'revenue', 'runtime', 'tagline', 'title', 'vote_average', 'vote_count'];
        if(!req.body.category || !req.body.search || !req.body.order) {
            // make sure fields arent missing
            res.status(400).json({message: "Missing Fields"});
        } else if (req.body.order !== 'ASC' && req.body.order !== 'DESC') {
            // white list order since thats being concated as well
            res.status(400).json({message: "Invalid Order"});
        } else if ( typeof req.body.category !== 'string' || acceptableColumns.indexOf(req.body.category) < 0 ) {
            // make sure category is both a  string and in our whitelist
            res.status(400).json({message: "Invalid Column Name"})
        } else {
            // build our query, log it, and execute
            const query = buildQuery(req);
            console.log('Query: ', query);
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
    } catch (err) {
        res.json({message: "Error", error: err})
    }
    
    
}

function buildQuery(req: Request) {
    if (!req.body || !req.body.category) {return null}
    let result:string = null;
    switch (req.body.category) {
        case 'release_date':
            // release date requires an extraction of the year and exact matching it to the search value
            result = "SELECT * FROM movies_meta WHERE EXTRACT (YEAR FROM release_date) = $1 ";
            break;
        default:
            // default query takes in a category and returning any record that contains the search value
            result = `SELECT * FROM movies_meta WHERE LOWER (${req.body.category}) LIKE LOWER( \'%$1#%\' ) ORDER BY COALESCE(${req.body.category}, null) ${req.body.order}`
            break;
    }
    return result;
}