import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';

export function getYearRange(req: Request, res: Response, next: NextFunction) {
    if(!req.body.startYear || !req.body.endYear) {
        res.status(500).json({message: "No search input supplied"})
    } else if (typeof req.body.startYear != "number" || typeof req.body.endYear != "number") {
        res.status(500).json({message: "You didn't supply a number. You should do that."})
    } else {
        const query = "SELECT * FROM movies_meta FULL OUTER JOIN movie_posters ON (title = poster_title) WHERE EXTRACT (YEAR FROM release_date) BETWEEN $1 AND $2 "
        db.any(query, [req.body.startYear, req.body.endYear]).then( (resp) => {
            res.json({message: "Search results",
                result: resp,
                query: query,
                endpoint: 'by-year',
                search: req.body.search
            })
        }).catch( err => res.json({message: "Error", result: err}))
    }
}