import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class TokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

      if(!authHeader) {
        return res.status(401).json({ message: 'No token provided' })
      }
      req['authorization'] = token;

      next()
    }
}