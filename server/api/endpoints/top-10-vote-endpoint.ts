import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';

export function topTen(req: Request, res: Response, next: NextFunction) {
    db.any("SELECT * FROM movies_meta ORDER BY ${category~} DESC LIMIT 10", req.body).then( (resp) => {
        res.json({message: 'Results found', result: resp})
    }).catch( err => res.json({message: "Error", result: err}))
}