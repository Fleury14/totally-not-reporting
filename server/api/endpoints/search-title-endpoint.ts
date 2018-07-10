import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';

export function search(req: Request, res: Response, next: NextFunction) {
    const query = 'SELECT * FROM movies_meta FULL OUTER JOIN movie_posters ON (title = poster_title) WHERE LOWER (title) LIKE LOWER( \'%$1#%\' )'
    db.any(query, String(req.body.search)).then( (resp) => {
        res.json({
            message: "Search results",
            result: resp,
            query: query,
            endpoint: 'search-title',
            search: req.body.search
        })
    }).catch( err => res.json({message: "Error", result: err}))
}