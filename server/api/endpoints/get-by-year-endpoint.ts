import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';

export function getByYear(req: Request, res: Response, next: NextFunction) {
    if(!req.body.search) {
        res.status(500).json({message: "No search input supplied"})
    } else if (typeof req.body.search != "number") {
        res.status(500).json({message: "You didn't supply a number. You should do that."})
    } else {
        db.any("SELECT * FROM movies_meta WHERE EXTRACT (YEAR FROM release_date) = $1 ", req.body.search).then( (resp) => {
            res.json({message: 'Results found', result: resp})
        }).catch( err => res.json({message: "Error", result: err}))
    }
   
}