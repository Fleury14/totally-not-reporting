import { Request, Response, NextFunction } from 'express';
import * as db from './../../../db/db';

export async function tableJoin(req: Request, res: Response, next: NextFunction) {
    try {
        if(!req.body.search) {
            res.status(400).json({message: "Missing Fields"});
        } else if (req.body.search === {selectMoviesMeta: true, selectMoviesVote: true, selectMoviesCredits: true}) {
            const query = 'SELECT * FROM movies_meta FULL OUTER JOIN movies_vote ON movies_meta.movie_id = movies_vote.vote_id JOIN movies_credits ON movies_meta.movie_id = movies_credits.credit_id ORDER BY movies_meta.movie_id';
            // console.log('Query: ', query);
            db.any(query, req.body.search).then( (resp) => {
                // return all relevant info for the storing of the query
                res.json({
                    message: "Search results",
                    result: resp,
                    query: query,
                    endpoint: 'table-join',
                    category: `Joins movies_meta, movies_vote, and movie_credits`,
                    search: req.body.search
                })
            }).catch(err => res.status(500).json({message: "Error", error: err}));
            } else if (req.body.search === {selectMoviesMeta: false, selectMoviesVote: true, selectMoviesCredits: true})  {
                const query = 'SELECT * FROM movies_vote FULL OUTER JOIN movies-credits ON movies_vote.vote_id = movies_credits.credit_id';
                // console.log('Query: ', query);
                db.any(query, req.body.search).then( (resp) => {
                // return all relevant info for the storing of the query
                res.json({
                    message: "Search results",
                    result: resp,
                    query: query,
                    endpoint: 'table-join',
                    category: `Joins movies_vote and movie_credits`,
                    search: req.body.search
                })
            }).catch(err => res.status(500).json({message: "Error", error: err}));
            } else if (req.body.search === {selectMoviesMeta: true, selectMoviesVote: false, selectMoviesCredits: true})  {
                const query = 'SELECT * FROM movies_meta FULL OUTER JOIN movies_credits ON movies_meta.movie_id = movies_credits.credit_id';
                // console.log('Query: ', query);
                db.any(query, req.body.search).then( (resp) => {
                // return all relevant info for the storing of the query
                res.json({
                    message: "Search results",
                    result: resp,
                    query: query,
                    endpoint: 'table-join',
                    category: `Joins movies_meta and movie_credits`,
                    search: req.body.search
                })
            }).catch(err => res.status(500).json({message: "Error", error: err}));
            } else if (req.body.search === {selectMoviesMeta: true, selectMoviesVote: true, selectMoviesCredits: false})  {
                const query = 'SELECT * FROM movies_vote FULL OUTER JOIN movies_meta ON movies_vote.vote_id = movies_meta.movie_id';
                // console.log('Query: ', query);
                db.any(query, req.body.search).then( (resp) => {
                // return all relevant info for the storing of the query
                res.json({
                    message: "Search results",
                    result: resp,
                    query: query,
                    endpoint: 'table-join',
                    category: `Joins movies_meta and movies_vote`,
                    search: req.body.search
                })
            }).catch(err => res.status(500).json({message: "Error", error: err}));
            }
    } catch (err) {
        res.json({message: "Error", error: err})
    }
    
}