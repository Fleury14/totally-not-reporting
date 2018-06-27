import { Request, Response, NextFunction } from 'express';

export function testEndpoint(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({message: 'Test endpoint successfully hit'});
}