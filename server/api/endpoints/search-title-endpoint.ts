import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';

export function search(req: Request, res: Response, next: NextFunction) {
    db.any('SELECT * FROM movies_meta WHERE LOWER (title) LIKE LOWER( \'%$1#%\' )', String(req.body.search)).then( (resp) => {
        res.json({message: 'Results found', result: resp})
    }).catch( err => res.json({message: "Error", result: err}))
}