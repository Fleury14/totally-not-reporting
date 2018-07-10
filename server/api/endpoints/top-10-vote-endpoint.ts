import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';
import { IMovie } from '../interfaces/movie';

export function topTen(req: Request, res: Response, next: NextFunction) {
    const acceptableColumns = ['budget', 'popularity', 'revenue', 'runtime', 'vote_average', 'vote_count'];
    if( !req.body.category ) {
        res.status(400).json({message: "Error: No category supplied"})
    } else if ( !acceptableColumns.includes(req.body.category)) {
        res.status(500).json({message: "Error: Unacceptable category"})
    } else {
        const query = "SELECT * FROM movies_meta FULL OUTER JOIN movie_posters ON (title = poster_title) ORDER BY COALESCE (${category~}, 0) DESC LIMIT 10"
        db.any(query, req.body).then( (resp) => {
            res.json({ message: "Search results",
                result: resp,
                query: query,
                endpoint: 'top10',
                category: req.body.category
            })
        }).catch( err => res.json({message: "Error", result: err}))
    }
    
}