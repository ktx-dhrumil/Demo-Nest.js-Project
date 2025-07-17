import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class Example1Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log("Another middleware.")
    next()
    // throw new HttpException("Middleware1 auth failed.", HttpStatus.UNAUTHORIZED)
  }
}
