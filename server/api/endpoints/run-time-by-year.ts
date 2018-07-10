import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';

export function runTimeByYearRange(req: Request, res: Response, next: NextFunction) {
    if(!req.body.startYear || !req.body.endYear){
        res.status(500).json({message: "No search input supplied"})
    } else if (typeof req.body.startYear != "number" || typeof req.body.endYear != "number") {
        res.status(500).json({message: "You didn't supply a number. You should do that."})
    } else {
        const query = "SELECT EXTRACT(YEAR FROM release_date), runtime, COUNT(runtime) FROM movies_meta WHERE EXTRACT(YEAR FROM release_date) BETWEEN $1 AND $2 GROUP BY EXTRACT(YEAR FROM release_date), runtime"
        db.any(query, [req.body.startYear, req.body.endYear]).then( (resp) => {
            res.json({message: "Search results",
                result: resp,
                query: query,
                endpoint: 'run-time-by-year',
                search: req.body.search
            })
        }).catch( err => res.json({message: "Error", result: err}))
    }
}