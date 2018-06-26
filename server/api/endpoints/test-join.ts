import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';

export function testJoin(req: Request, res: Response, next: NextFunction) {
    db.any('SELECT * FROM movies_meta FULL OUTER JOIN movies_credits ON (movie_id = credit_id) WHERE LOWER (title) LIKE LOWER( \'%$1#%\' )', String(req.body.search)).then( (resp) => {
        res.json({message: 'Results found', result: resp})
    }).catch( err => res.json({message: "Error", result: err}))
}