import { Request, Response, NextFunction } from 'express';
import * as db from './../../db/db';

export function listTest(req: Request, res: Response, next: NextFunction) {
    db.any(' SELECT * FROM teams', [true]).then( (data) => {
        res.json({message: 'List found', result: data})
    })
}