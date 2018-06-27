import { Request, Response, NextFunction } from 'express';

export function testBodyEndpoint(req: Request, res: Response, next: NextFunction) {
    console.log('Body endpoint test:', req.body);
    res.status(200).json({message: 'Test endpoint successfully hit', requestBody: req.body});
}