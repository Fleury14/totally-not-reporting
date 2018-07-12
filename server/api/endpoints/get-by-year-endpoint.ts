import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';

export function getByYear(req: Request, res: Response, next: NextFunction) {
    if(!req.body.search) {
        res.status(500).json({message: "No search input supplied"})
    } else if (typeof req.body.search != "number") {
        res.status(500).json({message: "You didn't supply a number. You should do that."})
    } else {
        const query = "SELECT * FROM movies_meta FULL OUTER JOIN movie_posters ON (title = poster_title AND movie_id = poster_id) WHERE EXTRACT (YEAR FROM release_date) = $1 "
        db.any(query, req.body.search).then( (resp) => {
            res.json({message: "Search results",
                result: resp,
                query: query,
                endpoint: 'by-year',
                search: req.body.search
            })
        }).catch( err => res.json({message: "Error", result: err}))
    }
   
}